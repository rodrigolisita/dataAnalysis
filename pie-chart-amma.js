function AmmaPieCharts() {
  

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Amma Pie-Charts';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'Amma-Pie-Charts';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      //'./data/tech-diversity/race-2018.csv', 'csv', 'header',
      './data/amma/AuditoriaOnline2023_Analises_01_08.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });
  };

  this.setup = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }
      
      

    // Create a select DOM element.
    this.select = createSelect();
    this.select.position(350, 60);

    //this.columnNames=[ "Certidão",
    //                   "OS ou PROC",
    //                   "Constatada irregularidade de competencia da AMMA",
    //                   "Constatada Poluição Sonora",
    //                   "Mes",
    //                   "Ano"                       
    //                  ];
    this.columnNames=[ "OS ou PROC",
                      "Meio de Locomoção",
                      "Constatada irregularidade de competencia da AMMA",
                      "Constatada Poluição Sonora"
                      ];
      
    // Fill the options with all company names.
    for (let i = 0; i < this.columnNames.length; i++) {
      this.select.option(this.columnNames[i]);
    }
    //var companies = [this.data.columns];
    // First entry is empty.
    //for (let i = 1; i < companies.length; i++) {
    //  this.select.option(companies[i]);
    //}
      
      var resultsOS = ["OS","PROCESSO","OS Disque Denúncia","NOTIFICAÇÃO"];
      
      //OS ou PROC ou NOT
      this.col = [];
      this.col[0]=0;
      this.col[1]=0;
      this.col[2]=0;
      this.col[3]=0;
      
      //Locomoção
      this.colLocomocao = [];
      this.colLocomocao[0]=0;
      this.colLocomocao[1]=0;
      
      //Constatada Irregularidade
      this.colIrregularidade = [];
      this.colIrregularidade[0]=0;
      this.colIrregularidade[1]=0;
      
      //Constatada Poluição Sonora
      this.colPS = [];
      this.colPS[0]=0;
      this.colPS[1]=0;
      
    for (var i=0; i<this.data.getRowCount();i++){
       if(this.data.getString(i,'OS ou PROC') === 'OS'){this.col[0]++}    
       if(this.data.getString(i,'OS ou PROC') === 'PROCESSO'){this.col[1]++}    
       if(this.data.getString(i,'OS ou PROC') === 'OS Disque Denúncia'){this.col[2]++}    
       if(this.data.getString(i,'OS ou PROC') === 'NOTIFICAÇÃO'){this.col[3]++}   
        
       if(this.data.getString(i,'Meio de Locomoção') === 'Viatura Oficial'){this.colLocomocao[0]++}   
       if(this.data.getString(i,'Meio de Locomoção') === 'Carro Próprio'){this.colLocomocao[1]++}   
        
       if(this.data.getString(i,'Constatada irregularidade de competencia da AMMA') === 'SIM'){this.colIrregularidade[0]++}   
        else{this.colIrregularidade[1]++}
        
        if(this.data.getString(i,'Constatada Poluição Sonora') === 'Foi constatada poluição sonora no momento da vistoria'){this.colPS[0]++}   
        if(this.data.getString(i,'Constatada Poluição Sonora') === 'Não foi constatada poluição sonora no momento da vistoria'){this.colPS[1]++}   
     
       
    }
            
      
  };

  this.destroy = function() {
    this.select.remove();
  };

  // Create a new pie chart object.
  this.pie = new PieChart(width / 2, height / 2, width * 0.4);

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Get the value of the company we're interested in from the
    // select item.
    var selectOption = this.select.value();

    // Get the column of raw data for companyName.
    //var col = this.data.getColumn(selectOption);
    //var col=[];
    //col[0] = this.col[0];
    //col[1] = this.col[1];
    //col[2] = this.col[2];
    //col[3] = this.col[3];
      for(var i=0;i<this.col.length;i++){
          console.log(this.col[i]);
      }
      var col=[];
      var labels = [];
      var colours = [];
      if(selectOption == "OS ou PROC"){
        col = this.col;          
        labels = ["OS","PROCESSO","OS Disque Denúncia","Notificação"]
      // Colour to use for each category.
        //var colours = ['blue', 'red', 'green', 'pink', 'purple', 'yellow'];
        colours = ['blue', 'red', 'green', 'pink'];
      }
      else if (selectOption == "Meio de Locomoção"){
        col = this.colLocomocao;          
        labels = ["Viatura Oficial","Carro Próprio"]
        // Colour to use for each category.
        colours = ['blue', 'red'];
      }
      else if (selectOption == "Constatada irregularidade de competencia da AMMA"){
        col = this.colIrregularidade;
        labels = ["SIM","NÃO"];
        colours = ['blue', 'red'];
      }
      else if (selectOption == 'Constatada Poluição Sonora'){
        col = this.colPS;
        labels = ["SIM","NÃO"];
        colours = ['blue', 'red'];
      }


    // Convert all data strings to numbers.
    //this.col = stringsToNumbers(this.col);

    // Copy the row labels from the table (the first item of each row).
    //var labels = this.data.getColumn(0);
      //var labels = ["OS","PROCESSO","OS Disque Denúncia","Notificação"]

    // Colour to use for each category.
    //var colours = ['blue', 'red', 'green', 'pink', 'purple', 'yellow'];
    //var colours = ['blue', 'red', 'green', 'pink'];

    // Make a title.
    var title = 'Pie Chart ' + selectOption;

    // Draw the pie chart!
    this.pie.draw(col, labels, colours, title);
      
  };

}
