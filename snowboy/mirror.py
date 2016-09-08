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

mirror_active = False

def start_mirror():
    global mirror_active
    if __name__=='__main__':
        if mirror_active == False: 
            p1 = Process(target = start_node)
            p1.start()
            mirror_active = True
            p2 = Process(target = snowboydecoder.play_audio_file(snowboydecoder.DETECT_DONG))
            p2.start()
        else:
            print("Magic Mirror already active.")

def start_node():
    os.system("npm start")

def end_mirror():
    global mirror_active
    if __name__=='__main__':
        if mirror_active == True: 
            p1 = Process(target = end_node)
            p1.start()
            mirror_active = False
            p2 = Process(target = snowboydecoder.play_audio_file(snowboydecoder.DETECT_DONG))
            p2.start()
        else:
            print("Magic Mirror is not active.")

# method that stops servers
def end_node():
    os.system("pkill -f electron")
    os.system("pkill -f music.py")

if len(sys.argv) != 3:
    print("Error: need to specify 2 model names")
    print("Usage: python demo.py 1st.model 2nd.model")
    sys.exit(-1)

models = sys.argv[1:]

# capture SIGINT signal, e.g., Ctrl+C
signal.signal(signal.SIGINT, signal_handler)

sensitivity = [0.5]*len(models)

detector = snowboydecoder.HotwordDetector(models, sensitivity=sensitivity)
callbacks = [start_mirror,
             end_mirror]
print('Listening for REFLECT... Press Ctrl+C to exit')

# main loop
# make sure you have the same numbers of callbacks and models
detector.start(detected_callback=callbacks,
               interrupt_check=interrupt_callback,
               sleep_time=0.03)


detector.terminate()
