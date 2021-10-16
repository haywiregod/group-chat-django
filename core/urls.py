from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from chat.views import index
urlpatterns = [
    path("", index, name="home"),
    path('admin/', admin.site.urls),
    path('chat/', include('chat.urls'))
]

if settings.DEBUG:
    urlpatterns + static(settings.STATIC_URL,
                         document_root=settings.STATIC_ROOT)
