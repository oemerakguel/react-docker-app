# Basis-Image mit Nginx
FROM nginx:alpine

# Entferne die Standard-Nginx-Dateien
RUN rm -rf /usr/share/nginx/html/*

# Kopiere das gebaute Projekt ins Nginx-Verzeichnis
COPY dist/ /usr/share/nginx/html/

# Port für den Container
EXPOSE 80
