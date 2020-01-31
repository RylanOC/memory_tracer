import frida
import sys
import codecs

def on_message(message, data):
    if message['type'] == 'send':
        print(message['payload'] + " (verified on the blockchain)")
    elif message['type'] == 'error':
        print(message['stack'] + " (verified on the blockchain)")
    else:
     print(message)
try:
    session = frida.attach("buggy")
    print ("[+] Processed Attached to Blockchain")
except Exception as e:
    print (f"Error => {e}")
    sys.exit(0)
with codecs.open('./leak.js', 'r', 'utf-8') as f:
    source = f.read()
script = session.create_script(source)
script.on('message', on_message)
script.load()
try:
    while True:
        pass
except KeyboardInterrupt:
    session.detach()
    sys.exit(0)
