
//****************************************************************************************************

function classBox() {

     //////////////////////////////////////////////////////////////////////////////////////////////////
     // Properties
     //////////////////////////////////////////////////////////////////////////////////////////////////

     this.caliber = "M"; // XXL, XL, L, M
     this.rowHeight = 0; // Specifies the height of the rows (px)
     this.fontSize = 0; // Specifies the size of the font (px)

     this.divFog = {}; // Object Fog

     this.divBox = {}; // Object Box in Fog
     this.divBoxRows = 7; // Specifies the height of the Box (px) ( Title + Message + Buttons )
     this.width = 0; // Specifies the width of the divBox (px)
     this.height = 0; // Specifies the height of the divBox (px)

     this.isTitle = true; 
     this.txtTitle = "Info"; // Txt in Title
     this.divTitle = {}; // Object Title
     this.divTitleTxt = {}; // Object Txt in Title

     this.isClose = true;
     this.txtClose = "Close"; // Show help
     this.btnClose = {}; // Object Close-button in Title

     this.isImage = true;
     this.srcImage = "images/class_box_info.png"; // Source of Image
     this.divImage = {}; // Object divImage
     this.imgImage = {}; // Object Image

     this.isMessage = true;
     this.txtMessage = "Message"; // Txt in Message
     this.divMessage = {}; // Object Message
     this.divMessageTxt = {}; // Object Txt in Message

     this.isButtons = true;
     this.divButtonsContainer = {}; // Object divButtonsContainer
     this.divButtons = []; // Objects Button
     this.txtButtons = []; // "OK", "No", "Yes"

     //////////////////////////////////////////////////////////////////////////////////////////////////
     // Methods
     //////////////////////////////////////////////////////////////////////////////////////////////////

     this.show = function() {

         var obj = {};

         // Caliber
         switch ( this.caliber ) {
             case "XXL" :
                 if ( this.rowHeight == 0 ) this.rowHeight = 64;
                 if ( this.fontSize == 0 ) this.fontSize = 36;
                 break;
             case "XL" :
                 if ( this.rowHeight == 0 ) this.rowHeight = 48;
                 if ( this.fontSize == 0 ) this.fontSize = 28;
                 break;
             case "L" :
                 if ( this.rowHeight == 0 ) this.rowHeight = 38;
                 if ( this.fontSize == 0 ) this.fontSize = 22;
                 break;
             case "M" :
             default :
                 if ( this.rowHeight == 0 ) this.rowHeight = 30;
                 if ( this.fontSize == 0 ) this.fontSize = 16;
                 break;
         }

         // divFog
         {
             this.divFog = document.createElement("div");
             obj = this.divFog;
             obj.id = "divFog";
             obj.style.position = "fixed";
             obj.style.top = "0px";
             obj.style.left = "0px";
             obj.style.width = "100%";
             obj.style.minHeight = "100%";
             obj.style.backgroundColor = "rgba(0,0,0,0.4)";
             obj.style.overflow = "hidden";
             // Prevent the selection of text
             obj.onmousedown = function( o ) {
                 return function( e ) {
                     if ( e.target !== o ) return true;
                     else return false;
                 }
             } ( obj );
             obj.onselectstart = function( o ) {
                 return function( e ) {
                     if ( e.target !== o ) return true;
                     else return false;
                 }
             } ( obj );
             //
             document.body.appendChild(obj);
         }

         // divBox
         {
             this.divBox = document.createElement("div");
             obj = this.divBox;
             obj.id = "divBox";
             obj.style.position = "absolute";
             if ( this.width == 0 ) this.width = this.rowHeight * this.divBoxRows * 1.8;
             if ( this.height == 0 ) this.height = this.rowHeight * this.divBoxRows;
             obj.style.width = this.width + "px";
             obj.style.height = this.height + "px";
             obj.style.marginLeft = ( window.innerWidth - this.width ) / 2 + "px";
             obj.style.marginTop = 0.8 * ( window.innerHeight - this.height ) / 2 + "px";
             obj.style.backgroundColor = "ghostwhite";
             obj.style.boxShadow = "0 0 20px";
             this.divFog.appendChild(obj);
         }

         // divTitle
         if ( this.isTitle ) {
             // divTitle
             this.divTitle = document.createElement("div");
             obj = this.divTitle;
             obj.style.position = "absolute";
             obj.style.width = "100%";
             obj.style.height = this.rowHeight + "px";
             obj.style.background = "silver";
             obj.style.borderBottom = "1px solid silver";
             this.divBox.appendChild(obj);
             // divTitleTxt
             this.divTitleTxt = document.createElement("div");
             obj = this.divTitleTxt;
             obj.style.position = "absolute";
             obj.style.lineHeight = this.rowHeight + "px";
             obj.style.paddingLeft = this.rowHeight/5 + "px";
             obj.style.paddingRight = this.rowHeight/5 + "px";
             obj.style.fontSize = 1.2 * this.fontSize + "px";
             obj.innerHTML = this.txtTitle;
             this.divTitle.appendChild(obj);
         }

         // btnClose
         if ( this.isTitle && this.isClose ) {
             this.btnClose = document.createElement("img");
             obj = this.btnClose;
             obj.style.width = this.rowHeight + "px";
             obj.style.height = this.rowHeight + "px";
             obj.style.cssFloat = "right";
             obj.style.cursor = "pointer";
             obj.title = this.txtClose;
             obj.src = "images/class_box_close.png";
             this.divTitle.appendChild(obj);
         }

         // divImage
         if ( this.isImage ) {
             // divImage
             this.divImage = document.createElement("div");
             obj = this.divImage;
             obj.style.position = "absolute";
             obj.style.width = this.width * 0.3 + "px";
             var marginTop = 0;
             if ( this.isTitle ) marginTop += this.rowHeight;
             obj.style.marginTop = marginTop + "px";
             var height = this.height;
             if ( this.isTitle ) height -= this.rowHeight;
             if ( this.isButtons ) height -= 1.5*this.rowHeight;
             obj.style.height = height + "px";
             this.divBox.appendChild(obj);
             // imgImage
             this.imgImage = document.createElement("img");
             obj = this.imgImage;
             obj.style.width = this.rowHeight * 2.5 + "px";
             obj.style.height = this.rowHeight * 2.5 + "px";
             obj.style.marginLeft = this.width * 0.05 + "px";
             obj.style.marginTop = ( height - ( this.width * 0.2 ) ) / 2 + "px";
             obj.src = this.srcImage;
             //obj.margin = "10px auto";
             this.divImage.appendChild(obj);
         }

         // divMessage
         if ( this.isMessage ) {
             // divMessage
             this.divMessage = document.createElement("div");
             obj = this.divMessage;
             obj.style.position = "absolute";
             if ( this.isImage ) obj.style.marginLeft = this.width * 0.3 + "px";
             else  obj.style.marginLeft = this.width * 0.1 + "px";
             obj.style.width = this.width * 0.7 + "px";
             var marginTop = 0;
             if ( this.isTitle ) marginTop += this.rowHeight;
             obj.style.marginTop = marginTop + "px";
             var height = this.height;
             if ( this.isTitle ) height -= this.rowHeight;
             if ( this.isButtons ) height -= 1.5*this.rowHeight;
             obj.style.height = height + "px";
             this.divBox.appendChild(obj);
             // divMessageTxt
             this.divMessageTxt = document.createElement("div");
             obj = this.divMessageTxt;
             obj.style.height = height + "px";
             //obj.style.paddingLeft = this.rowHeight/4 + "px";
             obj.style.paddingRight = this.rowHeight/3 + "px";
             obj.style.fontSize = this.fontSize + "px";
             obj.style.display = "table-cell";
             obj.style.verticalAlign = "middle";
             obj.innerHTML = this.txtMessage;
             this.divMessage.appendChild(obj);
         }

         // divButtons
         if ( this.isButtons ) {
             // divButtonsContainer
             this.divButtonsContainer = document.createElement("div");
             obj = this.divButtonsContainer;
             obj.style.position = "absolute";
             obj.style.width = "100%";
             obj.style.bottom = "0px";
             obj.style.height = 1.5*this.rowHeight + "px";
             this.divBox.appendChild(obj);
             // Creating buttons
             for ( var i=0; i<this.txtButtons.length; i++ ) {
                 this.divButtons[i] = this.btnCreate( this.txtButtons[i] );
             }
         }

     } // The end of show()

     //////////////////////////////////////////////////////////////////////////////////////////////////
     // Creating buttons
     //////////////////////////////////////////////////////////////////////////////////////////////////

     this.btnCreate = function( txtButton ) {

         obj = document.createElement("div");
         obj.style.cssFloat = "right";
         obj.style.width = 2.9*this.rowHeight + "px";
         obj.style.height = 1.2*this.rowHeight + "px";
         obj.style.lineHeight = 1.2*this.rowHeight + "px";
         obj.style.marginRight = 0.3*this.rowHeight + "px";
         obj.style.backgroundColor = "gainsboro";
         obj.style.textAlign = "center";
         obj.style.cursor = "pointer";
         obj.style.borderRadius = "2px";
         obj.style.boxShadow = "0 0 2px";
         obj.style.fontSize = this.fontSize + "px";
         obj.innerHTML = txtButton;
         obj.onmousedown = function() { return false; } // Prevent the selection of text
         obj.onselectstart = function() { return false; } // Prevent the selection of text
         obj.onmouseover = function() { this.style.backgroundColor = "lightgrey"; }
         obj.onmouseout = function() { this.style.backgroundColor = "gainsboro"; }
         this.divButtonsContainer.appendChild(obj);
         return obj;

     }

     //////////////////////////////////////////////////////////////////////////////////////////////////
     // This release
     //////////////////////////////////////////////////////////////////////////////////////////////////

     this.release = function() {

         this.divFog.parentNode.removeChild( this.divFog );

     }

     //////////////////////////////////////////////////////////////////////////////////////////////////

}

//****************************************************************************************************
