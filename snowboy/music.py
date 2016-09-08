import snowboydecoder
import sys
import signal
import os
from multiprocessing import Process



interrupted = False


def signal_handler(signal, frame):
    global interrupted
    interrupted = True


def interrupt_callback():
    global interrupted
    return interrupted

# ALL METHODS FOR CALLBACKS----------------------------------

def look_at_me():
    snowboydecoder.play_audio_file(snowboydecoder.DETECT_DONG)

def toothbrush():
    snowboydecoder.play_audio_file(snowboydecoder.DETECT_HOOKED)

def play_panda():
    snowboydecoder.play_audio_file(snowboydecoder.DETECT_PANDA)

# -----------------------------------------------------------


# if len(sys.argv) == 1:
#     print("Error: need to specify model name")
#     print("Usage: python demo.py your.model")
#     sys.exit(-1)

models = sys.argv[1:]

# capture SIGINT signal, e.g., Ctrl+C
signal.signal(signal.SIGINT, signal_handler)

sensitivity = [0.45]*len(models)

detector = snowboydecoder.HotwordDetector(models, sensitivity=sensitivity)
callbacks = [look_at_me, toothbrush, play_panda]
print('Listening for PANDA PANDA PANDA PANDA... Press Ctrl+C to exit')

# main loop
detector.start(detected_callback=callbacks,
               interrupt_check=interrupt_callback,
               sleep_time=0.03)

detector.terminate()

