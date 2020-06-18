#include <WiFi.h>
  
  const char* WIFI_NAME= ""; 
  const char* WIFI_PASSWORD = ""; 
  WiFiServer server(80);
  
  String header;
  
  String LEDSTATE = "off";  
  char color = 'f';
  const int RelayPin = 22;
  const int GPIO_PIN_NUMBER_23 = 23;
  const int GPIO_PIN_NUMBER_15 = 15;

void setup() {
    Serial.begin(115200);               //this is the native speed for a esp32S
    pinMode(RelayPin, OUTPUT);          //relay is a output pin. 
    digitalWrite(RelayPin, LOW);        //starts with relay off
    
    WiFi.begin(WIFI_NAME, WIFI_PASSWORD); //connects to wifi
    
    while (WiFi.status() != WL_CONNECTED) {   //while it is not connected
        delay(1000);
        Serial.print("connecting...");
      }
    Serial.println("");
    Serial.println("IP address: ");         
    Serial.println(WiFi.localIP());       //your devices subnet IP, use this to connect to it.... so to make it red it would be ("localIP"?color=r)... just viewing the page should turn it red.
    server.begin();
  }//end setup
  
void loop(){
    WiFiClient client = server.available(); 
    if (client) { 
        String current_data_line = ""; 
          while(client.connected()) { 
            if (client.available()) { 
              char new_byte = client.read(); 
              header += new_byte;
                if (new_byte == '\n') { 
                  if (current_data_line.length() == 0) 
                    {
                      client.println("HTTP/1.1 200 OK");
                      client.println("Content-type:text/html");
                      client.println("Connection: close");
                      client.println();

                      //I am using a relay, but you could just turn the LED's black and they wont be "on"
                      if (header.indexOf("LED=ON") != -1) 
                        {
                          LEDSTATE = "on";
                          digitalWrite(RelayPin, HIGH);//turns relay on
                          } 
                      if (header.indexOf("LED=OFF") != -1) 
                        {
                          LEDSTATE = "off";
                          digitalWrite(RelayPin, LOW);//turns relay off
                          } 
                      if (header.indexOf("color=w") != -1)//color white
                        {
                          color = 'w';
                          Serial.print(color);//sends the single charactor color code viea serial to arduino
                          }
                       if (header.indexOf("color=r") != -1)//color red
                        {
                          color = 'r';
                          Serial.print(color);//sends the single charactor color code viea serial to arduino
                          }
                      if (header.indexOf("color=g") != -1)//color green
                        {
                          color = 'g';
                          Serial.print(color);//sends the single charactor color code viea serial to arduino
                          }
                      if(header.indexOf("color=b") != -1)//color blue
                        {
                          color = 'b';
                          Serial.print(color);//sends the single charactor color code viea serial to arduino
                          }

                //for this application a page is not needed, it is only used to grab url encoded querries.. but this much is still needed to accomplish that.
                      client.println("<!DOCTYPE html><html>");
                      client.println("<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
                      client.println("<link rel=\"icon\" href=\"data:,\">");
                      client.println("<style>html { font-family: Helvetica; display: inline-block; margin: 0px auto; text-align: center;}");
                      client.println("</style></head>");
                      client.println("</html>");
                      client.println();
                      break;
                      } 
                  else
                  { 
                    current_data_line = "";
                    }
               } 
                else 
                  if (new_byte != '\r'){ 
                      current_data_line += new_byte; 
                      }
          }
        }
        // Clear the header variable
        header = "";
        // Close the connection
        client.stop();
      }
    }//end loop
