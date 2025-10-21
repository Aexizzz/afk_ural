#!/usr/bin/env python3
"""
Тест доступности медиафайлов
"""
import requests
import sys

def test_media_access():
    """Тестирует доступность медиафайлов"""
    
    # Тестируем существующие файлы
    test_files = [
        "https://afkural.ru/media/gallery/бердик_4gPdVCW.jpg",
        "https://afkural.ru/media/gallery/бердик.jpg",
        "https://afkural.ru/media/gallery/image.png"  # Этот файл не должен существовать
    ]
    
    print("🔍 Тестирование доступности медиафайлов...")
    print("=" * 50)
    
    for url in test_files:
        try:
            print(f"📁 Тестируем: {url}")
            response = requests.head(url, timeout=10)
            print(f"   Статус: {response.status_code}")
            print(f"   Content-Type: {response.headers.get('Content-Type', 'N/A')}")
            print(f"   Content-Length: {response.headers.get('Content-Length', 'N/A')}")
            
            if response.status_code == 200:
                print("   ✅ Файл доступен")
            else:
                print("   ❌ Файл недоступен")
                
        except requests.exceptions.RequestException as e:
            print(f"   ❌ Ошибка запроса: {e}")
        
        print()
    
    print("=" * 50)
    print("🎯 Тест завершен!")

if __name__ == "__main__":
    test_media_access()
