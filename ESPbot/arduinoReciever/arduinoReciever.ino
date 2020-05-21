//the Arduino code was done by : Dylan Poll
//https://www.linkedin.com/in/dylan-poll-4a324a1a2/
//to light up leds by color, the project uses a discord bot controlling a esp for inputs to a arduino via serial line.
//https://github.com/dylanpoll/DiscordBots/tree/master/ESPbot
// I used the FastLED libraries demo-reel as a foundation for this, please check out the fastLED github!!
//https://github.com/FastLED/FastLED/wiki/Overview
  
  #include <FastLED.h>
  FASTLED_USING_NAMESPACE
  #define DATA_PIN    9
  #define LED_TYPE    WS2811    //type of LED is important. wont work the same if it is using analog.
  #define COLOR_ORDER GRB
  #define NUM_LEDS    10
  CRGB leds[NUM_LEDS];
  #define BRIGHTNESS  10        
  #define FRAMES_PER_SECOND  20
  
  char color = 'F';// the default value that gets ignored
  
  //below are color choices. I use single a char because when using serial line, it is faster and easier to send less data.
  int R=0;//Red
  int G=0;//Green
  int B=0;//Blue
  int Y=0;//yellow
  int P=0;//purple
  
void setup() {
    delay(1000); // 1 second delay for recovery
    FastLED.addLeds<LED_TYPE,DATA_PIN,COLOR_ORDER>(leds, NUM_LEDS).setCorrection(TypicalLEDStrip);
    FastLED.setBrightness(BRIGHTNESS);
    FastLED.delay(1000/FRAMES_PER_SECOND);
    
    Serial.begin(115200);                     //serial is used for inputs
  }//end setup
void loop(){  
        color = Serial.read();                //reads input value 
        if(color != 'F'){
          while(i<NUM_LEDS){
            switch(color){                    //this checks the color input against our possible casses.
                case'r':
                    leds[i] = CRGB::Red;      //sets the color for led at position i
                  break;            
                case'g':
                    leds[i] = CRGB::Green; 
                  break;
                case'p':
                    leds[i] = 0xdd8bff;
                  break;
                case'b': 
                    leds[i] = CRGB::Blue;
                  break;
                case'y': 
                    leds[i] =  CRGB::Yellow; 
                  break;
                case'w':
                    leds[i] =  CRGB::White; 
                  break;
                case'O': //Off
                    leds[i] =  CRGB::Black; 
                  break;
                default:                    //simply breaks without incrimenting 
                  break;                    //because we only want to have a event if a proper input is given.
                }                        
                FastLED.show();             //this will "show" or light the LEDs according to our list above
                i++;                        //LED at this position has been set so it adds a +1 to the iterator
                delay(50);                  //this controlls the rate for the led "sweep" like change in colors. 
              }
          color = 'F';                      //used to wait until a valid input is given.
          }
     delay(50);
  }//end loop
