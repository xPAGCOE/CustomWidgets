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
			//console.log("loadWidget call");
			await getScriptPromisify('https://cdn.jsdelivr.net/npm/danfojs@1.1.2/lib/bundle.min.js');
			
			var main_container = this.shadowRoot.getElementById('main_container');
			
			this.dfd = dfd;
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
			
			var idx = new Array();
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
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
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					col = df.column(name);
				}
			}
			
			return col;
		}
		
		// values
		values(dataframe) {
			
			var values = new Array();
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
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
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
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
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					shape_arr = df.shape;
				}
			}
			
			return shape_arr;
		}
		
		/*** Indexing, iteration ***/
		// head
		head(dataframe, rows) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df = df.head(rows);
				}
			}
			
			return df;
		}
		
		// loc
		loc(dataframe, args) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df = df.loc(args);
				}
			}
			
			return df;
		}
		
		// iloc
		iloc(dataframe, args) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df = df.iloc(args);
				}
			}
			
			return df;
		}
		
		// tail
		tail(dataframe, rows) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df = df.tail(rows);
				}
			}
			
			return df;
		}
		
		// query
		query(dataframe, kwargs) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df = df.query(kwargs);
				}
			}
			
			return df;
		}
		
		/*** Binary operator functions ***/
		// Add
		addDataFrame(dataframe, other) {
			
			var df_new = null;
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				var df_oth = this.newDataFrame(other.$data, {columns: other.$columns});
				
				if(df != null) {
					df_new = df.add(df_oth);
				}
			}
			
			return df_new;
		}
		
		addValue(dataframe, value) {
			
			var df_new = null;
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df_new = df.add(value);
				}
			}
			
			return df_new;
		}
		
		addValues(dataframe, values, axis, inplace) {
			
			var df_new = null;
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				var sf_values = new this.dfd.Series(values);
				
				if(df != null) {
					df_new = df.add(sf_values, {axis: axis, inplace: inplace});
				}
			}
			
			return df_new;
		}
		
		// Sub
		subDataFrame(dataframe, other) {
			
			var df_new = null;
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				var df_oth = this.newDataFrame(other.$data, {columns: other.$columns});
				
				if(df != null) {
					df_new = df.sub(df_oth);
				}
			}
			
			return df_new;
		}
		
		subValue(dataframe, value) {
			
			var df_new = null;
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df_new = df.sub(value);
				}
			}
			
			return df_new;
		}
		
		subValues(dataframe, values, axis, inplace) {
			
			var df_new = null;
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				var sf_values = new this.dfd.Series(values);
				
				if(df != null) {
					df_new = df.sub(sf_values, {axis: axis, inplace: inplace});
				}
			}
			
			return df_new;
		}
		
		// Mul
		MulDataFrame(dataframe, other) {
			
			var df_new = null;
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				var df_oth = this.newDataFrame(other.$data, {columns: other.$columns});
				
				if(df != null) {
					df_new = df.mul(df_oth);
				}
			}
			
			return df_new;
		}
		
		mulValue(dataframe, value) {
			
			var df_new = null;
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df_new = df.mul(value);
				}
			}
			
			return df_new;
		}
		
		mulValues(dataframe, values, axis, inplace) {
			
			var df_new = null;
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				var sf_values = new this.dfd.Series(values);
				
				if(df != null) {
					df_new = df.mul(sf_values, {axis: axis, inplace: inplace});
				}
			}
			
			return df_new;
		}
		
		// Div
		MulDataFrame(dataframe, other) {
			
			var df_new = null;
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				var df_oth = this.newDataFrame(other.$data, {columns: other.$columns});
				
				if(df != null) {
					df_new = df.div(df_oth);
				}
			}
			
			return df_new;
		}
		
		divValue(dataframe, value) {
			
			var df_new = null;
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df_new = df.div(value);
				}
			}
			
			return df_new;
		}
		
		divValues(dataframe, values, axis, inplace) {
			
			var df_new = null;
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				var sf_values = new this.dfd.Series(values);
				
				if(df != null) {
					df_new = df.div(sf_values, {axis: axis, inplace: inplace});
				}
			}
			
			return df_new;
		}
		
		/*** Function application & GroupBy ***/
		
		//TODO
		
		/*** Computations / descriptive stats ***/
		// Max
		max(dataframe, axis) {
			
			var df_max = null;
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df_max = df.max({axis: axis});
				}
			}
			
			return df_max;
		}
		
		// Min
		max(dataframe, axis) {
			
			var df_min = null;
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df_min = df.min({axis: axis});
				}
			}
			
			return df_min;
		}
		
		// Sum
		sum(dataframe, axis) {
			
			var df_sum = null;
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df_sum = df.sum({axis: axis});
				}
			}
			
			return df_sum;
		}
		
		cumSum(dataframe, axis, inplace) {
			
			var df_csum = null;
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df_csum = df.cumSum({axis: axis, inplace: inplace});
				}
			}
			
			return df_csum;
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
							
		// Add a new column from existing ones
		addColumnFromExisting(dataframe, column, src_columns, operator) {
			
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					
					// select demanded columns
					var sub_df = df.loc({columns: src_columns});
					
					switch(operator) {
						case "+":
							sub_df = sub_df.cumSum({axis: 1});
							df = this.dfd.concat({ dfList: [df, sub_df], axis: 1 });
							break;
						case "-":
						// TODO
							break;
						case "x":
						// TODO
							break;
						case "/":
						// TODO
							break;
						default:
							break;
					}
				}
			}
			
			return df;
		}
		
		// Concat
		concat(dataframes, axis) {
			
			var df = null;
			
			if(dataframes.length != 0) {
				
				var df_list = new Array(dataframes.length);
				
				for(var ite=0; ite<dataframes.length; ite++) {
					df = this.newDataFrame(dataframes[ite].$data, {columns: dataframes[ite].$columns});
					if(df != null) {
						df_list.push(df);
					}
				}
				
				df = this.dfd.concat({ dfList: df_list, axis: axis });
			}
			
			return df;
		}
    }

    window.customElements.define('com-sap-sample-sacdataframe', SACDataFrame);
})()
