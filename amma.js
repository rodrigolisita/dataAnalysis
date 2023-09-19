function AMMA() {
    
  // Name for the visualisation to appear in the menu bar.
  this.name = 'Dados Anuais / Data by year';
    
// Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'AMMA-id';    
  this.listByYear = [];
    
  
  this.readData2023;
  this.readData2022;
  

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
      
      this.readData2023= loadTable(
      './data/amma/AuditoriaOnline2023_Analises_01_08.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });
      
      this.setores = loadTable(
      './data/amma/LISTADESETORES.csv', 'csv', 
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });
      
      this.readData2022 = loadTable('./data/amma/AuditoriaOnline2022_Analises.csv', 'csv', 'header',
        function(table) {
          self.loaded = true;
      });
      
  };
    
// Fill the options with all types.
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
    this.year=['2023','2022'];
    
    this.listDF=['Art. 29','Art. 56','Art. 61','Art. 62 V','Art. 62 X','Art. 66','Art. 74','Art. 81','Art. 90'];
    
    this.listOfGraphs = ['General Data','Art DF','Peças'];
    
    this.lan=['Portugues','English'];

  this.setup = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      button = createButton('Load Data');
        button.position(20, 65);
        button.mousePressed(this.preload());
      return;
    }
      
    // Create a select DOM element.
    this.select = createSelect();
    this.select.position(350, 40);
      
    this.selectENG = createSelect();
    this.selectENG.position(350, 40);
      
    this.selectLan = createSelect();
    this.selectLan.position(1300, 40);
    for (let i = 0; i < this.lan.length; i++) {
      this.selectLan.option(this.lan[i]);
    }
      
      
    this.selectYear = createSelect();
    this.selectYear.position(950, 40);
      
    this.selectGraph = createSelect();
    this.selectGraph.position(1100,40);
 
    for (let i = 0; i < this.reportTypes.length; i++) {
      this.select.option(this.reportTypes[i]);
    }

    for (let i = 0; i < this.reportTypesENG.length; i++) {
      this.selectENG.option(this.reportTypesENG[i]);
    }
      
    for (let i = 0; i < this.year.length; i++){
      this.selectYear.option(this.year[i]);
      this.listByYear.push(new YEARSLIST(this.year[i]));
      for(let j=0; j<this.listDF.length;j++){
            this.listByYear[i].startArtDF(this.listDF[j]);
      }
      for (let j = 0; j < this.reportTypes.length; j++) {
          this.listByYear[i].addReportTypes(this.reportTypes[j]);
      }        
    }
      
    for (let i = 0; i < this.listOfGraphs.length; i++){
        this.selectGraph.option(this.listOfGraphs[i]);
    }
    
    var value;
    
    for(var k=0;k<this.year.length;k++){
        if(this.year[k]==="2023"){
            var dataloaded = this.readData2023;          
        }else if (this.year[k]==="2022"){
            var dataloaded = this.readData2022;          
        }else{};
        for (var i=0; i<dataloaded.getRowCount();i++)
        {
            value = dataloaded.getString(i,'Tipo de Estabelecimento');
            for(var j=0; j<this.reportTypes.length;j++){
                if(value == this.reportTypes[j]){
                    this.listByYear[k].reportTypes[j].nValues++;
                    if(dataloaded.getString(i,'OS ou PROC') === 'OS'){this.listByYear[k].reportTypes[j].vistOS++} ;   
                    if(dataloaded.getString(i,'OS ou PROC') === 'PROCESSO'){this.listByYear[k].reportTypes[j].vistPROC++};  
                    if(dataloaded.getString(i,'OS ou PROC') === 'OS Disque Denúncia'){this.listByYear[k].reportTypes[j].vistD++};    
                    if(dataloaded.getString(i,'OS ou PROC') === 'NOTIFICAÇÃO'){this.listByYear[k].reportTypes[j].vistNOT++};                    
                
                    if(dataloaded.getString(i,'Número da Notificação') !== ""){this.listByYear[k].reportTypes[j].NOT++};
                    if(dataloaded.getString(i,'Número do Auto de Infração') !== ""){this.listByYear[k].reportTypes[j].AI++};
                    if(dataloaded.getString(i,'Número do Auto de Apreensão')!= ""){this.listByYear[k].reportTypes[j].AA++};
                    if(dataloaded.getString(i,'BIS')=="SIM"){this.listByYear[k].reportTypes[j].BIS++};
                };
            };
            for(var j=0;j<this.listDF.length;j++){
                if(dataloaded.getString(i,'Art. Decreto Federal') == this.listDF[j]){
                    this.listByYear[k].artDF[j].AI++;
                };
            };
        };
    };
      
      
  };
    
    

  this.destroy = function() {
    this.select.remove();
    this.selectENG.remove();
    this.selectYear.remove();
    this.selectGraph.remove();
    this.selectLan.remove();
    while (this.listByYear.length) { 
        this.listByYear.pop(); 
    };
  };

 this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    };
     
     var id;
     var idYear;
     var idLan;
     
     var selectedValue = this.select.value();
     var selectedENGValue = this.selectENG.value();
     var selectedYearValue = this.selectYear.value();
     var selectedLanguage = this.selectLan.value();

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
     
     
    
     
    for (let i = 0; i < this.year.length; i++) {
      if(this.year[i]==selectedYearValue){
        idYear=i; 
      };
    };

     var idGraph=this.selectGraph.value();
     //console.log(idGraph);
     
     if(idGraph==this.listOfGraphs[0]){
         push();
        this.select.show();
        fill(65);
        textSize(30);
        textAlign(LEFT);
        let locx=300;
        if(selectedLanguage == this.lan[0]){ //Portuguese language
        text("Fato Gerador OS: " + this.listByYear[idYear].reportTypes[id].vistOS, locx, 150);
        text("Fato Gerador Processo: " + this.listByYear[idYear].reportTypes[id].vistPROC, locx, 200);
        text("Fato Gerador Disque denúncia: " + this.listByYear[idYear].reportTypes[id].vistD, locx, 250);
        text("Fato Gerador Notificação: " + this.listByYear[idYear].reportTypes[id].vistNOT, locx, 300);
        text("Total Vistorias: " + (this.listByYear[idYear].reportTypes[id].nValues), locx, 350);
        text("Notificação: " + this.listByYear[idYear].reportTypes[id].NOT, locx, 400);
        text("Auto de Infração: " + this.listByYear[idYear].reportTypes[id].AI, locx, 450);
        text("Auto de Apreensão: " + this.listByYear[idYear].reportTypes[id].AA, locx, 500);
        text("Boletim de Intensidade Sonora: " + this.listByYear[idYear].reportTypes[id].BIS, locx, 550);                 
        }else{
        text("Generating event OS: " + this.listByYear[idYear].reportTypes[id].vistOS, locx, 150);
        text("Generating event Judicial/Administrative Process: " + this.listByYear[idYear].reportTypes[id].vistPROC, locx, 200);
        text("Generating event phone call: " + this.listByYear[idYear].reportTypes[id].vistD, locx, 250);
        text("Generating event administrative notification: " + this.listByYear[idYear].reportTypes[id].vistNOT, locx, 300);
        text("Total inspections: " + (this.listByYear[idYear].reportTypes[id].nValues), locx, 350);
        text("Administrativa notification: " + this.listByYear[idYear].reportTypes[id].NOT, locx, 400);
        text("Infraction notice: " + this.listByYear[idYear].reportTypes[id].AI, locx, 450);
        text("Seizure Notice: " + this.listByYear[idYear].reportTypes[id].AA, locx, 500);
        text("Sound Intensity Bulletin: " + this.listByYear[idYear].reportTypes[id].BIS, locx, 550);                 
            
        }
        pop();
     }else if(idGraph==this.listOfGraphs[1]){
         push();
         this.selectLan.hide();
         background(255);
         noStroke();
         fill(0,200,220);
         
         let val;
         
        //This graphic I got the idea and colour from here:
        //https://www.section.io/engineering-education/getting-started-with-data-visualization-using-p5js/ 
         for(var i=0;i<this.listByYear[idYear].artDF.length;i++){
             val=this.listByYear[idYear].artDF[i].AI;
             let posx = map(i,0,this.listByYear[idYear].artDF.length,40,width);
             rect(posx,height-30,40,-val);
             textAlign(CENTER);
             text(round(val),posx+20,height-val-40);                                                
             push();
             textSize(14);
             fill("black");
             text(this.listByYear[idYear].artDF[i].name,posx+20,height-5);                                                
             pop();
         };

         textSize(16);
         textAlign(LEFT);
         var posY=150;
         
         text("Quantidade de Multas (Number of Infraction Notice) ", 200, 100);        
         for(let i=0;i<this.listDF.length;i++){
             text("Decreto Federal (federal law) " + this.listByYear[idYear].artDF[i].name + " = " + this.listByYear[idYear].artDF[i].AI, 200, posY);        
             posY+=30;    
         };
         this.select.hide();
         pop();    
     }else if(idGraph==this.listOfGraphs[2]){
         this.selectLan.hide();
         push();
         this.select.show();
         background(255);
         noStroke();
         fill(0,200,220);
         
     
         //console.log("NOT: " + this.listByYear[idYear].reportTypes[id].NOT);
         var pecas=[this.listByYear[idYear].reportTypes[id].NOT,
                  this.listByYear[idYear].reportTypes[id].AI,
                  this.listByYear[idYear].reportTypes[id].AA,
                  this.listByYear[idYear].reportTypes[id].BIS];
         var valNames=["Notificação","Auto de Infração","Auto de Apreensão","BIS"];
                 
         for(var i=0;i<pecas.length;i++){
             let val=pecas[i];
             let posx = map(i,0,pecas.length,40,width);
             rect(posx,height-30,40,-val);
             textAlign(CENTER);
             push();
             fill('black');
             text(round(val),posx+20,height-35);                                                
             textSize(14);
             
             text(valNames[i],posx+20,height-5);                                                
             pop();
         }
     }else{
         //Do nothing
     }
     
     
     
     
     
 };

 function ART_DF(name){
    this.name = name;
    this.AI = 0;
 }

function REPORT(name){
    this.name=name;
    this.nValues=0;
    this.vistOS=0;
    this.vistPROC=0;
    this.vistD=0;
    this.vistNOT=0;
    this.NOT=0;
    this.AI=0;
    this.AA=0;
    this.BIS=0;
            
}
    
function YEARSLIST(year){
    this.year = year;
    this.artDF=[];
    this.reportTypes=[];
    
    this.startArtDF=function(listDF){
        this.addArtType = function(listDF){
            var p = new ART_DF(listDF);
            return p;
        };
        this.artDF.push(this.addArtType(listDF));
    };
    
    this.addReportTypes = function(name){
        this.reportTypes.push(new REPORT(name));
    };

    
}
 
}

