function AmmaSetores(){
 
   
    
// Name for the visualisation to appear in the menu bar.
  this.name = 'Setores / Districs';
  this.created=false;

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'Amma-Setores';
 
    
  //Subject
  this.reportTypes=['COVID19',
                     'Ações relativas à conservação das águas em geral',
                     'Ações relativas à conservação do solo em geral',
                     'Água Servida',
                     'Aterramento de nascentes',
                     'Contaminação do solo por posto de combustível',
                     'Corte de Árvore',
                     'Desmatamento',
                     'Educação Ambiental',
                     'Entulhamento',
                     'Lançamento irregular de efluentes em curso hídrico',
                     'Lançamento irregular de resíduos',
                     'Lote: mato alto',
                     'Lote: lixo, entulho ou resíduos',
                     'Maus tratos de animais',
                     'Ocupação irregular de área ambientalmente protegida',
                     'Poluição atmosférica',
                     'Poluição sonora',
                     'Poluição visual',
                     'Redução do risco de queimadas'
                    ];
    
    this.reportTypesENG=['COVID19',
                     'Actions related to water conservation in general',
                     'Actions related to soil conservation in general',
                     'Wastewater',
                     'Grounding of springs',
                     'Soil contamination by gas station',
                     'Illegal tree cutting',
                     'Logging',
                     'Environmental education',
                     'Clutter',
                     'Irregular release of effluents into watercourses',
                     'Irregular disposal of waste',
                     'Tall bush',
                     'Garbage, rubble or waste',
                     'Animal abuse',
                     'Irregular occupation of an environmentally protected area',
                     'Atmospheric pollution',
                     'Noise pollution',
                     'Visual pollution',
                     'Reducing the risk of fires'
                    ];
     
      //[0] "COVID19"
      //[1] "Ações relativas à conservação das águas em geral"
      //[2] "Ações relativas à conservação do solo em geral"
      //[3] "Água Servida"
      //[4] "Aterramento de nascentes"
      //[5] "Contaminação do solo por posto de combustível"
      //[6] "Corte de Árvore"
      //[7] "Desmatamento"
      //[8] "Educação Ambiental"
      //[9] "Entulhamento"
      //[10] "Lançamento irregular de efluentes em curso hídrico"
      //[11] "Lançamento irregular de resíduos"
      //[12] "Lote: mato alto"
      //[13] "Lote: lixo, entulho ou resíduos"
      //[14] "Maus tratos de animais"
      //[15] "Ocupação irregular de área ambientalmente protegida"
      //[16] "Poluição atmosférica"
      //[17] "Poluição sonora"
      //[18] "Poluição visual"
      //[19] "Redução do risco de queimadas"

    this.columnNames=["Número do Auto de Apreensão",
                       "Número do Auto de Infração",
                       "BIS",
                       "Certidão",
                       "Número do Termo de Embargo",
                       "Número da Notificação",
                       "Imagem",
                       "OS ou PROC",
                       "Setor",
                       "Constatada irregularidade de competencia da AMMA",
                       "Situação Lote",
                       "LAeq ligado 1",
                       "NCA considerado 1",
                       "Zona 1",
                       "Período 1",
                       "Realizada Medição 2",
                       "Laeq ligado 2",
                       "NCA considerado 2",
                       "Zona 2",
                       "Período 2",
                       "Realizada Medição 3",
                       "Laeq ligado 3",
                       "NCA considerado 3",
                       "Zona 3",
                       "Período 3",
                       "Constatada Poluição Sonora",
                       "Art (LC 014)",
                       "Art. Decreto Federal",
                       "Fazer Certidão",
                       "Mes",
                       "Ano"                       
                      ];         
    
    
   this.listOfGraphs = ["Dados","Circle"];
    
   this.lan=['Portugues','English'];
    
    //District data
   this.dataSectors = [];
   
   //Keep the biggest numbers by type and District
    this.listBiggest = [];

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
     
      this.data = loadTable(
      './data/amma/AuditoriaOnline2023_Analises_01_08.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });
      
     this.setores = loadTable('./data/amma/LISTADESETORES.csv', 'csv');
  
      
  };   
    
    
    
    
    this.setup = function() {
    // Font defaults.
    textSize(16);
 
        
    // Create a select DOM element.
    this.select = createSelect();
    this.select.position(350, 40);
        
    this.selectENG = createSelect();
    this.selectENG.position(350, 40);
    
    this.selectLan = createSelect();
    this.selectLan.position(1400, 40);
    for (let i = 0; i < this.lan.length; i++) {
      this.selectLan.option(this.lan[i]);
    }
        
    this.selectSector = createSelect();
    this.selectSector.position(950, 40);

    this.selectGraph = createSelect();
    this.selectGraph.position(1250,40);
 
    for (let i = 0; i < this.reportTypes.length; i++) {
      this.select.option(this.reportTypes[i]);
    }
        
    for (let i = 0; i < this.reportTypesENG.length; i++) {
        this.selectENG.option(this.reportTypesENG[i]);
    }        
        
    for (let i = 0; i < this.setores.getRowCount(); i++) {
      this.selectSector.option(this.setores.getString(i,0));
    }
    
    for (let i = 0; i < this.listOfGraphs.length; i++){
        this.selectGraph.option(this.listOfGraphs[i]);
    }
        
    
      //console.log("Hello from Setores " + this.data.getRowCount());
      //console.log("Hello number of Setores " + this.setores.getRowCount());
        

      for(var i=0;i<this.setores.getRowCount();i++){
          this.dataSectors.push(new TheSector(this.setores.getString(i,0).toLowerCase()))
          for(var j=0;j<this.reportTypes.length;j++){
            this.dataSectors[i].startSectorsTypes(this.reportTypes[j])
          }
      }

        var value;
        var valueS;
        for (var i=0; i<this.data.getRowCount();i++)
        {
            value = this.data.getString(i,'Tipo de Estabelecimento');
            valueS = this.data.getString(i,'Setor').toLowerCase();
            console.log(value + " " + valueS);
            
            for(var k=0; k<this.setores.getRowCount();k++){
                if(valueS == this.setores.getString(k,0).toLowerCase() ){
                    for(var j=0; j<this.reportTypes.length;j++){
                        if(value == this.reportTypes[j]){
                            this.dataSectors[k].types[j].VIST++;
                            if(this.data.getString(i,'Número do Auto de Infração') !== ""){
    //                            console.log(i + " " + j);
                                this.dataSectors[k].types[j].AI++;
                            }
                            if(this.data.getString(i,'Número do Auto de Apreensão')!= ""){this.dataSectors[k].types[j].AA++}
                            if(this.data.getString(i,'Número da Notificação')!= ""){this.dataSectors[k].types[j].NOT++}
                        }
                    }            
                }
                
            }
        }
        
        for(var i=0; i<this.reportTypes.length;i++){
            this.listBiggest.push(new TheBiggest(this.reportTypes[i],5));
            this.listBiggest[i].startBiggest();
        }
        
        for(var i=0; i<this.reportTypes.length;i++){
            for (var j=0; j<this.setores.getRowCount();j++){
                this.listBiggest[i].organize5(this.listBiggest[i].biggestVist,
                                              this.listBiggest[i].biggestVistName,this.dataSectors[j].types[i].VIST,this.dataSectors[j].name)
                this.listBiggest[i].organize5(this.listBiggest[i].biggestNOT,
                                              this.listBiggest[i].biggestNOTName,this.dataSectors[j].types[i].NOT,this.dataSectors[j].name)
                this.listBiggest[i].organize5(this.listBiggest[i].biggestAI,
                                              this.listBiggest[i].biggestAIName,this.dataSectors[j].types[i].AI,this.dataSectors[j].name)

            }    
        }    
            
     
  };

    
 this.destroy = function() {
    this.select.remove();
    this.selectENG.remove();
    this.selectSector.remove();
    this.selectGraph.remove();
    this.selectLan.remove();
     
    while (this.dataSectors.length) { 
        this.dataSectors.pop(); 
    }
    while (this.listBiggest.length) { 
        this.listBiggest.pop(); 
    }
  };

    this.draw = function() {

     if (!this.loaded) {
        console.log('Data not yet loaded');
        button = createButton('Load Data');
        button.position(500, 40);
        button.mousePressed(this.preload());
      return;
    }
        
    var selectedValue = this.select.value();
    var selectedENGValue = this.selectENG.value();
    var selectedSectorValue = this.selectSector.value().toLowerCase();
    var selectedGraphValue = this.selectGraph.value();
    var selectedLanguage = this.selectLan.value();
    
    var id;
    var idSector;
    var idLan;

    //Need these loops to get a number from the selection
    for (let i = 0; i < this.lan.length; i++) {
      if(this.lan[i]==selectedLanguage){
          idLan = i;
      };
    };
     
     if(selectedLanguage == this.lan[0]){ //Portuguese language
        this.selectENG.hide();
        this.select.show();
        for (let i = 0; i < this.reportTypes.length; i++) {
            if(this.reportTypes[i]==selectedValue){
                id=i; 
            };
        };         
     }else{ //English language
         this.selectENG.show();
         this.select.hide();
         for (let i = 0; i < this.reportTypesENG.length; i++) {
            if(this.reportTypesENG[i]==selectedENGValue){
                id=i; 
            };
        };         
     }
        
    for (let i = 0; i < this.setores.getRowCount(); i++) {
      if(this.setores.getString(i,0).toLowerCase()==selectedSectorValue){
        idSector=i; 
      }
    }          
    
    if(selectedGraphValue==this.listOfGraphs[0]){
        text("AI: " + this.dataSectors[idSector].types[id].AI, 100, 100);
        text("AA: " + this.dataSectors[idSector].types[id].AA, 300, 100);
        text("Notificações: " + this.dataSectors[idSector].types[id].NOT, 500, 100);
        text("Vistorias: " + this.dataSectors[idSector].types[id].VIST, 700, 100);
        text("Infraction Notice",100,120);
        text("seizure notice",300,120);            
        text("Administrative notification",500,120);            
        text("Inspections",700,120);            
            
        //console.log(this.dataSectors[10].types[17]);
        
        push();
        textSize(14);
        textAlign(LEFT);
        var locY=400;
        text("Campeões Vist: ", 150, locY);
        text("Campeões NOT: ", 450, locY);
        text("Campeões AI: ", 750, locY);
        text("Districts with most inspections: ", 150, locY-15);
        text("Disctricts with most notification: ", 450, locY-15);
        text("Districts with most Infraction notice: ", 750, locY-15);            
        
        
//        console.log(this.listBiggest[id].quantity);
        for(var k=0;k<this.listBiggest[id].quantity;k++){
            locY+=20;
            text((k+1) + ": " + this.listBiggest[id].biggestVistName[k] + ": " + this.listBiggest[id].biggestVist[k] , 150, locY);
            text((k+1) + ": " + this.listBiggest[id].biggestNOTName[k] + ": " + this.listBiggest[id].biggestNOT[k] , 450, locY);
            text((k+1) + ": " + this.listBiggest[id].biggestAIName[k] + ": " + this.listBiggest[id].biggestAI[k] , 750, locY);
        }
        pop();

    
        console.log(this.dataSectors[idSector].types.length);
    
    //---------
    //---------
    //An interesting visualization from https://codepen.io/enginarslan/pen/aJJmZP/
    //---------
    //---------
    
    //if(selectedGraphValue == "circle"){
    }else if(selectedGraphValue==this.listOfGraphs[1]){
        this.select.hide();
        var maxData;
        this.select.hide();
        background(43, 53, 63);
        fill(139, 171, 203,200);
        stroke(89, 86, 74);

        var quantityAI = [];
        for (let i = 0; i < this.reportTypes.length; i = i + 1) {
            quantityAI.push(this.dataSectors[idSector].types[i].AI);
        }
        
        var angleSeparation = 360 / this.reportTypes.length;
        var padding = 20;
        
        if (frameCount <= 400) {
            maxValue = constrain(frameCount * 2, 0, 400);
        } else {
            maxValue = 400;
        }
        var offset = 200;
        maxData = max(quantityAI)    ;
        //console.log("max data = " + maxData);
        var dataMultiplier = (height/2-offset-padding) / maxData;
        
        for (let i = 0; i < this.reportTypes.length; i++) {
            push();
            var currentData = this.dataSectors[idSector].types[i].AI;
            var finalHeight = currentData * dataMultiplier;
            var animatedHeight = map(maxValue, 0, 400, 0, finalHeight);
            translate(width/2, height/2);
            rotate(angleSeparation * i);
            rect(0,offset, angleSeparation*2, animatedHeight);
            //Need this rotation to make text position correct
            //Not right in the example
            rotate(90); 
            if(selectedLanguage == this.lan[0]){text(this.reportTypes[i], offset-20, 0);}
            else{text(this.reportTypesENG[i], offset-20, 0);}
        pop();
        }
    }else{
        this.select.show();
    }
    //--------
    
    };


function types(name){
    this.vistType = name;
    this.AI = 0;
    this.AA = 0;
    this.NOT = 0;
    this.VIST = 0;
    this.most = [];
    this.nMost;
    this.testCondition = true;
    
    
    this.startMost = function(n){
        this.nMost = n;
        for(var i=0;i<this.nMost;i++){
            this.most.push(0);
        }
        this.testCondition = true;
    };
    
    //this.updateAI = function(){
    //    this.AI++;
    //}
    //this.updateAA = function(){
    //    this.AA++;
    //}
}

function TheSector(name){
    this.name = name;
    this.types=[];

    
    this.startSectorsTypes = function(sectorType){
        this.addSectorType = function(sectorType){
            var p = new types(sectorType);
            return p;
        };
        this.types.push(this.addSectorType(name));
    };
    
    this.increaseAI = function(i){
        this.types[i].AI++;
    };
    this.increaseAA = function(i){
        this.types[i].AA++;
    };
    
}
    
function TheBiggest(type,nl){
    this.type = type;
    this.quantity = nl;
    this.biggestAI = [];
    this.biggestAIName = [];
    this.biggestVist = [];
    this.biggestVistName = [];
    this.biggestNOT = [];
    this.biggestNOTName = [];
    
    this.startBiggest = function(){         
        
        for(var i=0;i<this.quantity;i++){
            this.biggestAI.push(0);    
            this.biggestAIName.push("");
            
            this.biggestVist.push(0);
            this.biggestVistName.push("");
            
            this.biggestNOT.push(0);
            this.biggestNOTName.push("");
        };
    };
    
    this.organize5 = function(x,y,value,name){
        if(value > x[0]){
            x[5]=x[4];
            y[5]=y[4];
            x[4]=x[3];
            y[4]=y[3];
            x[3]=x[2];
            y[3]=y[2];
            x[2]=x[1];
            y[2]=y[1];
            x[1]=x[0];
            y[1]=y[0];
            x[0]=value;
            y[0]=name;
        }else if(value > x[1]){
            x[5]=x[4];
            y[5]=y[4];
            x[4]=x[3];
            y[4]=y[3];
            x[3]=x[2];
            y[3]=y[2];
            x[2]=x[1];
            y[2]=y[1];
            x[1]=value;
            y[1]=name;
        }else if(value > x[2]){
            x[5]=x[4];
            y[5]=y[4];
            x[4]=x[3];
            y[4]=y[3];
            x[3]=x[2];
            y[3]=y[2];
            x[2]=value;
            y[2]=name;
        }else if(value > x[3]){
            x[5]=x[4];
            y[5]=y[4];
            x[4]=x[3];
            y[4]=y[3];
            x[3]=value;
            y[3]=name;
        }else if(value > x[4]){
            x[5]=x[4];
            y[5]=y[4];
            x[4]=value;
            y[4]=name;
        }else if(value > x[5]){
            x[5]=value;
            y[5]=name;
        }
    };
    
 
}

    
   
    
}