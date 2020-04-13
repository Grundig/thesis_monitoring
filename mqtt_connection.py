import paho.mqtt.client as mqtt
import json


# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    # Subscribing to "/devices/#" gives us subscription to all devices in the application.
    client.subscribe("engindividualprojectapplication/devices/#")


# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    message_fields = json.loads(msg.payload.decode())
    print(message_fields["app_id"])
    try:
        with open("data/message.json", "w") as f:
            json.dump(message_fields, f)
    except OSError:
        print("File was unavailable, message skipped.")


mclient = mqtt.Client()
mclient.on_connect = on_connect
mclient.on_message = on_message
mclient.username_pw_set("engindividualprojectapplication", password="ttn-account-v2.BIashck8tyZXrhKUapfHMGRoCOsGSpX5Li7uS4nh6mk")
mclient.connect("eu.thethings.network", 1883)

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
mclient.loop_forever()
