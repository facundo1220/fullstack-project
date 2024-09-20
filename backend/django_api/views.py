from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import UserSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from django.core.cache import cache
from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail
from django.core.mail import send_mail


@api_view(["POST"])
def login(request):
    user = get_object_or_404(User, email=request.data["email"])

    if not user.check_password(request.data["password"]):
        return Response(
            {"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST
        )

    refresh = RefreshToken.for_user(user)
    token = str(refresh.access_token)
    refresh_token = str(refresh)

    session_key = f"user_session_{user.id}"
    session_data = {"user_id": user.id, "last_activity": timezone.now().isoformat()}

    cache.set(
        session_key, session_data, timeout=refresh.access_token.lifetime.total_seconds()
    )

    serializer = UserSerializer(instance=user)

    return Response(
        {
            "access_token": token,
            "refresh_token": refresh_token,
            "user": serializer.data,
        },
        status=status.HTTP_200_OK,
    )


@api_view(["POST"])
def register(request):

    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        user = User.objects.get(username=serializer.data["username"])
        user.set_password(serializer.data["password"])
        user.save()

        token = Token.objects.create(user=user)

        return Response(
            {"token": token.key, "user": serializer.data},
            status=status.HTTP_201_CREATED,
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def profile(request):
    serilizer = UserSerializer(instance=request.user)
    return Response(serilizer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
def refresh_token(request):
    refresh_token = request.data["refresh_token"]

    refresh = RefreshToken(refresh_token)
    token = str(refresh.access_token)

    user = User.objects.get(id=refresh["user_id"])

    session_key = f"user_session_{user.id}"

    session_data = cache.get(session_key)

    if session_data:
        session_data["last_activity"] = timezone.now().isoformat()
        cache.set(
            session_key,
            session_data,
            timeout=refresh.access_token.lifetime.total_seconds(),
        )
    else:
        session_data = {"user_id": user.id, "last_activity": timezone.now().isoformat()}
        cache.set(
            session_key,
            session_data,
            timeout=refresh.access_token.lifetime.total_seconds(),
        )

    return Response({"access_token": token}, status=status.HTTP_200_OK)


@receiver(reset_password_token_created)
def password_reset_token_created(
    sender, instance, reset_password_token, *args, **kwargs
):

    email_plaintext_message = (
        "Open the link to reset your password"
        + " "
        + "{}{}".format(
            instance.request.build_absolute_uri(
                "http://0.0.0.0:80/reset-password-form/"
            ),
            reset_password_token.key,
        )
    )

    send_mail(
        "Password Reset for {title}".format(title="Crediation portal account"),
        email_plaintext_message,
        "info@yourcompany.com",
        [reset_password_token.user.email],
        fail_silently=False,
    )


@api_view(["POST"])
def clear_cache_data(request):
    cache.clear()
