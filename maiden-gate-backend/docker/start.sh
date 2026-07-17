#!/usr/bin/env bash
set -e

echo "Preparando Laravel..."

php artisan config:clear
php artisan route:clear
php artisan view:clear

echo "Criando link do storage..."
php artisan storage:link || true

echo "Rodando migrations..."
php artisan migrate --force

echo "Otimizando Laravel..."
php artisan optimize

echo "Iniciando Apache..."
exec apache2-foreground