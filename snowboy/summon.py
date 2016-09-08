import snowboydecoder
import sys
import signal
import os
from multiprocessing import Process


# Demo code for listening two hotwords at the same time

interrupted = False


def signal_handler(signal, frame):
    global interrupted
    interrupted = True


def interrupt_callback():
    global interrupted
    return interrupted

alexa_active = False

def start_alexa():
    global alexa_active
    if __name__=='__main__':
        if alexa_active == False:
            p1 = Process(target = run_alexa)
            p1.start()
            alexa_active = True
            p2 = Process(target = snowboydecoder.play_audio_file(snowboydecoder.DETECT_DONG))
            p2.start()
        else:
            print("Alexa already active.")

def run_alexa():
    os.chdir("../AlexaPi")
    os.system("python start.py Alexa.pmdl")


def stop_alexa():
    global alexa_active
    if alexa_active == True:
        os.system("pkill -f start.py")
        alexa_active = False
    else:
        print("Alexa is not active.")

if len(sys.argv) != 3:
    print("Error: need to specify 2 model names")
    print("Usage: python demo.py 1st.model 2nd.model")
    sys.exit(-1)

models = sys.argv[1:]

# capture SIGINT signal, e.g., Ctrl+C
signal.signal(signal.SIGINT, signal_handler)

sensitivity = [0.5]*len(models)
detector = snowboydecoder.HotwordDetector(models, sensitivity=sensitivity)
callbacks = [start_alexa,
             stop_alexa]
print('Listening... Press Ctrl+C to exit')

# main loop
# make sure you have the same numbers of callbacks and models
detector.start(detected_callback=callbacks,
               interrupt_check=interrupt_callback,
               sleep_time=0.03)


detector.terminate()
