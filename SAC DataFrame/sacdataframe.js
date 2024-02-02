/*!
	SACDataFrame.js
*/

var getScriptPromisify = (src) => {
    return new Promise(resolve => {
      $.getScript(src, resolve)
    })
  }

(function () {
    const template = document.createElement('template');
    template.innerHTML = `
	<style>
    :host {
		font-size: 14px;
		font-family: arial;
		font-color: #346187;
		overflow: overlay;
    }
	</style>
    <div id="main_container" hidden>
    </div>
    `;

    class SACDataFrame extends HTMLElement{
		
        constructor(){
            console.log("constructor call");
			super();

            //HTML objects
            let shadowRoot = this.attachShadow({mode:'open'});
            shadowRoot.appendChild(template.content.cloneNode(true));
    
            this._props = {};
			
			// private attributes
			this.dfd = null;
        }
		
		// loadWidget
		async loadWidget() {
			console.log("loadWidget call");
			await getScriptPromisify('https://cdn.jsdelivr.net/npm/danfojs@1.1.2/lib/bundle.min.js');
			
			var main_container = this.shadowRoot.getElementById('main_container');
			
			this.dfd = dfd;
			console.log(dfd);
		}
		
		// SAC custom widget events handlers
        onCustomWidgetBeforeUpdate(changedProperties) {
			//console.log("onCustomWidgetBeforeUpdate call");
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			//console.log("onCustomWidgetAfterUpdate call");
			//console.log(changedProperties);
			this.loadWidget();
		}
		
		connectedCallback(){
			//console.log("connectedCallback call");
		}
		
		// Methods
		
		// DataFrame creation
		newDataFrame(data, options) {
			
			var df = null;
			
			if(this.dfd != null) {
				df = new this.dfd.DataFrame(data, options);
			}
			
			return df;
		}
		
		/*** Attributes ***/
		// index
		index(dataframe) {
			
			var idx = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					idx = df.index;
				}
			}
			
			return idx;
		}
		
		// column
		column(dataframe, name) {
			
			var col = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					col = df.column(name);
				}
			}
			
			return col;
		}
		
		// values
		values(dataframe) {
			
			var values = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					values = df.values;
				}
			}
			
			return values;
		}
		
		// axis
		axis(dataframe) {
			
			var axis_obj = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					axis_obj = df.axis;
				}
			}
			
			return axis_obj;
		}
		
		// shape
		shape(dataframe) {
			
			var shape_arr = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					shape_arr = df.shape;
				}
			}
			
			return shape_arr;
		}
		
		/*** Indexing, iteration ***/
		// head
		head(dataframe, rows) {
			var head_df = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					head_df = df.head(rows);
				}
			}
			
			return head_df;
		}
		
		// loc
		loc(dataframe, args) {
			var loc_df = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					loc_df = df.loc(args);
				}
			}
			
			return loc_df;
		}
		
		// iloc
		iloc(dataframe, args) {
			var iloc_df = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					iloc_df = df.iloc(args);
				}
			}
			
			return iloc_df;
		}
		
		// tail
		tail(dataframe, rows) {
			var tail_df = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					tail_df = df.tail(rows);
				}
			}
			
			return tail_df;
		}
		
		// query
		query(dataframe, kwargs) {
			var query_df = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					query_df = df.query(kwargs);
				}
			}
			
			return query_df;
		}
		
		
		/*** Combining / comparing / joining / merging ***/
		// Append a row
		appendRow(dataframe, values, index, inplace) {
			
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df = df.append(values, index, {inplace:inplace});
				}
			}
			
			return df;
		}
		
		
		// Add a new column of values
		addColumn(dataframe, column, values, inplace) {
			
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df = df.addColumn(column, values, {inplace:inplace});
				}
			}
			
			return df;
		}
    }

    window.customElements.define('com-sap-sample-sacdataframe', SACDataFrame);
})()
