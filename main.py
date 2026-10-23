# -*- coding: utf-8 -*-
"""
LuffyGame — загрузчик полной версии.
Если рядом нет полного кода, скачивает его из репозитория (нужен интернет один раз).
После этого работает полностью офлайн.
"""
import os
import sys
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
FULL = os.path.join(HERE, "_luffy_full.py")
URL = "https://raw.githubusercontent.com/AnnaSharkUy/Laptev_Project/main/main.py"

def ensure_full():
    if os.path.isfile(FULL) and os.path.getsize(FULL) > 15000:
        return FULL
    print("=" * 50)
    print("  Первая загрузка полной версии LuffyGame...")
    print("=" * 50)
    try:
        urllib.request.urlretrieve(URL, FULL)
        print("  Готово! Дальше можно играть без интернета.")
    except Exception as e:
        print("  Не удалось скачать:", e)
        print()
        print("  Скопируйте вручную файл main.py из:")
        print("  https://github.com/AnnaSharkUy/Laptev_Project")
        print("  (переименуйте в _luffy_full.py в этой папке)")
        input("  Enter для выхода...")
        sys.exit(1)
    return FULL

if __name__ == "__main__":
    path = ensure_full()
    sys.path.insert(0, HERE)
    import runpy
    runpy.run_path(path, run_name="__main__")
