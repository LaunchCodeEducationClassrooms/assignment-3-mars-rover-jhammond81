class Rover {
   // Write code here!
   
   constructor(position) {
     this.position = position;
     this.generatorWatts = 110;
     if (!position) {
       throw Error("Cannot move.");
     }
     this.mode = 'NORMAL';
   }
   
   receiveMessage(message){
     let retObj={};
     retObj.message=message.name;
     retObj.results=[];
     
     for(var command in message.commands){
      let tempObj={};
      if(message.commands[command].commandType=="MOVE"){
          if(this.mode=="NORMAL"){
            tempObj.completed=true;
            this.position=message.commands[command].value;
          }
          else{
            tempObj.completed=false;
          }
      }
      else if(message.commands[command].commandType=="STATUS_CHECK"){
        tempObj.completed=true;
        tempObj.roverStatus=this;
      }
      else if(message.commands[command].commandType=="MODE_CHANGE"){
        tempObj.completed=true;
        this.mode=message.commands[command].value;
      }
      else{
        tempObj.completed=false;
      }
      retObj.results.push(tempObj);
     }
     return retObj;
    }
    

}

module.exports = Rover;