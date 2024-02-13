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
		newDataFrame(data, options, is_series = false) {
			
			var df = null;
			
			if(this.dfd != null) {
				
				if(is_series) {
					var data_arr = new Array();
					data_arr[0] = data;
					df = new this.dfd.DataFrame(data_arr, options);
				}
				else {
					df = new this.dfd.DataFrame(data, options);
				}
			}
			
			return df;
		}
		
		// Internal DataFrame creation from existing object
		newInternalDataFrame(dataframe) {
			var df = null;
			
			if (dataframe != null) {
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns, index: dataframe.$index}, dataframe.$isSeries);
			}
			
			return df;
		}
		
		// print
		print(dataframe) {
			var df_sf = null;
			
			if (dataframe != null) {
				if(!dataframe.$isSeries) {
					df_sf = this.newInternalDataFrame(dataframe);
				}
				else {
					df_sf = new this.dfd.Series(dataframe.$data);
				}
				
				if(df_sf != null) {
					df_sf.print();
				}
			}
		}
		
		/*** Attributes ***/
		// index
		index(dataframe) {
			
			var idx = new Array();
			
			if(dataframe != null) {
				
				var df = this.newInternalDataFrame(dataframe);
				
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
				
				var df = this.newInternalDataFrame(dataframe);
				
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
				
				var df = this.newInternalDataFrame(dataframe);
				
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
				
				var df = this.newInternalDataFrame(dataframe);
				
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
				
				var df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					shape_arr = df.shape;
				}
			}
			
			return shape_arr;
		}
		
		/*** Indexing, iteration ***/
		
		// drop
		drop(dataframe, columns, inplace) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					if(inplace == true) {
						df.drop({ columns: columns, inplace: inplace });
					} 
					else {
						df = df.drop({ columns: columns, inplace: inplace });
					}
				}
			}
			
			return df;
		}
		
		// head
		head(dataframe, rows) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				
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
				
				df = this.newInternalDataFrame(dataframe);
				
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
				
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					df = df.iloc(args);
				}
			}
			
			return df;
		}
		
		// rename
		rename(dataframe, mapper, axis, inplace) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					if(inplace == true) {
						df.rename({mapper: mapper}, {axis: axis, inplace: inplace});
					}
					else {
						df = df.rename({mapper: mapper}, {axis: axis, inplace: inplace});
					}
				}
			}
			
			return df;
		}
		
		// tail
		tail(dataframe, rows) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					df = df.tail(rows);
				}
			}
			
			return df;
		}
		
		// query
		query(dataframe, mask) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				var df_mask = this.newInternalDataFrame(mask);
				
				if((df != null) && (df_mask != null)) {
					df = df.query(df_mask);
				}
			}
			
			return df;
		}
		
		/*** Binary operator functions ***/
		// Add
		addDataFrame(dataframe, other) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				var df_oth = this.newInternalDataFrame(other);
				
				if(df != null) {
					df = df.add(df_oth);
				}
			}
			
			return df;
		}
		
		addValue(dataframe, value) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					df = df.add(value);
				}
			}
			
			return df;
		}
		
		addValues(dataframe, values, axis, inplace) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				var sf_values = new this.dfd.Series(values);
				
				if(df != null) {
					if(inplace == true) {
						df.add(sf_values, {axis: axis, inplace: inplace});
					}
					else {
						df = df.add(sf_values, {axis: axis, inplace: inplace});
					}
				}
			}
			
			return df;
		}
		
		// Sub
		subDataFrame(dataframe, other) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				var df_oth = this.newInternalDataFrame(other);
				
				if(df != null) {
					df = df.sub(df_oth);
				}
			}
			
			return df;
		}
		
		subValue(dataframe, value) {
			
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					df = df.sub(value);
				}
			}
			
			return df;
		}
		
		subValues(dataframe, values, axis, inplace) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				var sf_values = new this.dfd.Series(values);
				
				if(df != null) {
					if(inplace == true) {
						df.sub(sf_values, {axis: axis, inplace: inplace});
					}
					else {
						df = df.sub(sf_values, {axis: axis, inplace: inplace});
					}
				}
			}
			
			return df;
		}
		
		// mul
		mulDataFrame(dataframe, other) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				var df_oth = this.newInternalDataFrame(other);
				
				if(df != null) {
					df = df.mul(df_oth);
				}
			}
			
			return df;
		}
		
		mulValue(dataframe, value) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					df = df.mul(value);
				}
			}
			
			return df;
		}
		
		mulValues(dataframe, values, axis, inplace) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				var sf_values = new this.dfd.Series(values);
				
				if(df != null) {
					if(inplace == true) {
						df.mul(sf_values, {axis: axis, inplace: inplace});
					}
					else {
						df = df.mul(sf_values, {axis: axis, inplace: inplace});
					}
				}
			}
			
			return df;
		}
		
		// Div
		divDataFrame(dataframe, other) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				var df_oth = this.newInternalDataFrame(other);
				
				if(df != null) {
					df = df.div(df_oth);
				}
			}
			
			return df;
		}
		
		divValue(dataframe, value) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					df = df.div(value);
				}
			}
			
			return df;
		}
		
		divValues(dataframe, values, axis, inplace) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				var sf_values = new this.dfd.Series(values);
				
				if(df != null) {
					if(inplace == true) {
						df.div(sf_values, {axis: axis, inplace: inplace});
					}
					else {
						df = df.div(sf_values, {axis: axis, inplace: inplace});
					}
				}
			}
			
			return df;
		}
		
		// Comparison operators
		// <
		ltDataFrame(dataframe, other) {
			var df = null;
			
			if(dataframe != null) {
				df = this.newInternalDataFrame(dataframe);
				var df_oth = this.newInternalDataFrame(other);
				
				if((df != null) && (df_oth != null)) {
					df = df.lt(df_oth);
				}
			}
			
			return df;
		}
		
		ltValue(dataframe, value) {
			var df = null;
			
			if(dataframe != null) {
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					df = df.lt(value);
				}
			}
			
			return df;
		}
		
		ltValues(dataframe, values, axis) {
			var df = null;
			
			if(dataframe != null) {
				df = this.newInternalDataFrame(dataframe);
				var sf_values = new this.dfd.Series(values);
				
				if(df != null) {
					df = df.lt(sf_values, {axis: axis});
				}
			}
			
			return df;
		}
		
		// >
		gtDataFrame(dataframe, other) {
			var df = null;
			
			if(dataframe != null) {
				df = this.newInternalDataFrame(dataframe);
				var df_oth = this.newInternalDataFrame(other);
				
				if((df != null) && (df_oth != null)) {
					df = df.gt(df_oth);
				}
			}
			
			return df;
		}
		
		gtValue(dataframe, value) {
			var df = null;
			
			if(dataframe != null) {
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					df = df.gt(value);
				}
			}
			
			return df;
		}
		
		gtValues(dataframe, values, axis) {
			var df = null;
			
			if(dataframe != null) {
				df = this.newInternalDataFrame(dataframe);
				var sf_values = new this.dfd.Series(values);
				
				if(df != null) {
					df = df.gt(sf_values, {axis: axis});
				}
			}
			
			return df;
		}
		
		// <=
		leDataFrame(dataframe, other) {
			var df = null;
			
			if(dataframe != null) {
				df = this.newInternalDataFrame(dataframe);
				var df_oth = this.newInternalDataFrame(other);
				
				if((df != null) && (df_oth != null)) {
					df = df.le(df_oth);
				}
			}
			
			return df;
		}
		
		leValue(dataframe, value) {
			var df = null;
			
			if(dataframe != null) {
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					df = df.le(value);
				}
			}
			
			return df;
		}
		
		leValues(dataframe, values, axis) {
			var df = null;
			
			if(dataframe != null) {
				df = this.newInternalDataFrame(dataframe);
				var sf_values = new this.dfd.Series(values);
				
				if(df != null) {
					df = df.le(sf_values, {axis: axis});
				}
			}
			
			return df;
		}
		
		// >=
		geDataFrame(dataframe, other) {
			var df = null;
			
			if(dataframe != null) {
				df = this.newInternalDataFrame(dataframe);
				var df_oth = this.newInternalDataFrame(other);
				
				if((df != null) && (df_oth != null)) {
					df = df.ge(df_oth);
				}
			}
			
			return df;
		}
		
		geValue(dataframe, value) {
			var df = null;
			
			if(dataframe != null) {
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					df = df.ge(value);
				}
			}
			
			return df;
		}
		
		geValues(dataframe, values, axis) {
			var df = null;
			
			if(dataframe != null) {
				df = this.newInternalDataFrame(dataframe);
				var sf_values = new this.dfd.Series(values);
				
				if(df != null) {
					df = df.ge(sf_values, {axis: axis});
				}
			}
			
			return df;
		}
		
		// <>
		neDataFrame(dataframe, other) {
			var df = null;
			
			if(dataframe != null) {
				df = this.newInternalDataFrame(dataframe);
				var df_oth = this.newInternalDataFrame(other);
				
				if((df != null) && (df_oth != null)) {
					df = df.ne(df_oth);
				}
			}
			
			return df;
		}
		
		neValue(dataframe, value) {
			var df = null;
			
			if(dataframe != null) {
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					df = df.ne(value);
				}
			}
			
			return df;
		}
		
		neStrValue(dataframe, value) {
			var df = null;
			
			if(dataframe != null) {
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					
					var mat_cmp = new Array();
					
					for(var i=0; i<df.shape[0]; i++) {
						
						mat_cmp[i] = new Array();
						
						for(var j=0; j<df.shape[1]; j++) {
							mat_cmp[i][j] = Boolean(df.iat(i, j) != value);
						}	
					}
					
					df = this.newDataFrame(mat_cmp, {columns: dataframe.$columns, index: dataframe.$index});
				}
			}
			
			return df;
		}
		
		neValues(dataframe, values, axis) {
			var df = null;
			
			if(dataframe != null) {
				df = this.newInternalDataFrame(dataframe);
				var sf_values = new this.dfd.Series(values);
				
				if(df != null) {
					df = df.ne(sf_values, {axis: axis});
				}
			}
			
			return df;
		}
		
		// =
		eqDataFrame(dataframe, other) {
			var df = null;
			
			if(dataframe != null) {
				df = this.newInternalDataFrame(dataframe);
				var df_oth = this.newInternalDataFrame(other);
				
				if((df != null) && (df_oth != null)) {
					df = df.eq(df_oth);
				}
			}
			
			return df;
		}
		
		eqValue(dataframe, value) {
			var df = null;
			
			if(dataframe != null) {
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					df = df.eq(value);
				}
			}
			
			return df;
		}
		
		eqStrValue(dataframe, value) {
			var df = null;
			
			if(dataframe != null) {
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					
					var mat_cmp = new Array();
					
					for(var i=0; i<df.shape[0]; i++) {
						
						mat_cmp[i] = new Array();
						
						for(var j=0; j<df.shape[1]; j++) {
							mat_cmp[i][j] = Boolean(df.iat(i, j) == value);
						}	
					}
					
					df = this.newDataFrame(mat_cmp, {columns: dataframe.$columns, index: dataframe.$index});
				}
			}
			
			return df;
		}
		
		eqValues(dataframe, values, axis) {
			var df = null;
			
			if(dataframe != null) {
				df = this.newInternalDataFrame(dataframe);
				var sf_values = new this.dfd.Series(values);
				
				if(df != null) {
					df = df.eq(sf_values, {axis: axis});
				}
			}
			
			return df;
		}
		
		/*** Function application & GroupBy ***/
		
		//TODO
		
		/*** Computations / descriptive stats ***/
		// Max
		max(dataframe, axis) {
			
			var df_max = null;
			
			if(dataframe != null) {
				
				var df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					df_max = df.max({axis: axis});
				}
			}
			
			return df_max;
		}
		
		// Min
		min(dataframe, axis) {
			
			var df_min = null;
			
			if(dataframe != null) {
				
				var df = this.newInternalDataFrame(dataframe);
				
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
				
				var df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					df_sum = df.sum({axis: axis});
				}
			}
			
			return df_sum;
		}
		 // cumSum
		cumSum(dataframe, axis, inplace) {
			
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					if(inplace == true) {
						df.cumSum({axis: axis, inplace: inplace});
					}
					else {
						df = df.cumSum({axis: axis, inplace: inplace});
					}
				}
			}
			
			return df;
		}
		
		// mean
		mean(dataframe, axis) {
			
			var df_mean = null;
			
			if(dataframe != null) {
				
				var df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					df_mean = df.mean({axis: axis});
				}
			}
			
			return df_mean;
		}
		
		/*** Missing data handling ***/
		// dropNa
		dropNa(dataframe, axis, inplace) {
			
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					if(inplace == true) {
						df.dropNa({ axis: axis, inplace: inplace });
					}
					else {
						df = df.dropNa({ axis: axis, inplace: inplace });
					}
				}
			}
			
			return df;
		}
		
		// fillNa
		fillNa(dataframe, columns, values, inplace) {
			
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					if(inplace == true) {
						df.fillNa(values, { columns: columns, inplace: inplace });
					}
					else {
						df = df.fillNa(values, { columns: columns, inplace: inplace });
					}
				}
			}
			
			return df;
		}
		
		fillNaWithStringValues(dataframe, columns, values, inplace) {
			return this.fillNa(dataframe, columns, values, inplace);
		}
		
		fillNaWithNumberValues(dataframe, columns, values, inplace) {
			return this.fillNa(dataframe, columns, values, inplace);
		}
		
		fillNaWithBooleanValues(dataframe, columns, values, inplace) {
			return this.fillNa(dataframe, columns, values, inplace);
		}
		
		// isNa
		isNa(dataframe, columns) {
			
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					df = df.isNa({ columns: columns });
				}
			}
			
			return df;
		}
		
		// Replace
		replace(dataframe, old_value, new_value, columns, inplace) {
			
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					if(inplace == true) {
						df.replace(old_value, new_value, { columns: columns, inplace: inplace });
					}
					else {
						df = df.replace(old_value, new_value, { columns: columns, inplace: inplace });
					}
				}
			}
			
			return df;
		}
		
		replaceNumber(dataframe, old_value, new_value, columns, inplace) {	
			return this.replace(dataframe, old_value, new_value, columns, inplace);
		}
		
		replaceString(dataframe, old_value, new_value, columns, inplace) {	
			return this.replace(dataframe, old_value, new_value, columns, inplace);
		}
		
		replaceBoolean(dataframe, old_value, new_value, columns, inplace) {	
			return this.replace(dataframe, old_value, new_value, columns, inplace);
		}
		
		
		/*** Sorting & transposing ***/
		// sortValues
		sortValues(dataframe, column, ascending, inplace) {
			
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					if(inplace == true) {
						df.sortValues(column, { ascending: ascending, inplace: inplace });
					}
					else {
						df = df.sortValues(column, { ascending: ascending, inplace: inplace });
					}
				}
			}
			
			return df;
		}
		
		// transpose
		transpose(dataframe) {
			
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					df = df.T;
				}
			}
			
			return df;
		}
		
		
		/*** Combining / comparing / joining / merging ***/
		// Append a row
		appendRow(dataframe, values, index, inplace) {
			
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					if (inplace == true) {
						df.append(values, index, {inplace:inplace});
					}
					else {
						df = df.append(values, index, {inplace:inplace});
					}
				}
			}
			
			return df;
		}
		
		// Add a new column of values
		addColumn(dataframe, column, values, inplace) {
			
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					if (inplace == true) {
						df.addColumn(column, values, {inplace:inplace});
					}
					else {
						df = df.addColumn(column, values, {inplace:inplace});
					}
				}
			}
			
			return df;
		}
							
		// Add a new column from existing ones
		addColumnFromExisting(dataframe, column, src_columns, operator) {
			
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newInternalDataFrame(dataframe);
				
				if(df != null) {
					
					// select demanded columns
					var sub_df = df.loc({columns: src_columns});
					var sub_df1 = sub_df.iloc({columns: [0]});
					var sub_df2 = sub_df.iloc({columns: ["1:"]});
					var ite = 0;
					
					switch(operator) {
						case "+":
							sub_df = sub_df.sum({axis: 1});
							df = this.dfd.concat({ dfList: [df, sub_df], axis: 1 });
							df.rename({ "0": column }, { inplace: true });
							break;
						case "-":
							sub_df2 = sub_df2.sum({axis: 1}).mul(-1);
							sub_df = this.dfd.concat({ dfList: [sub_df1, sub_df2], axis: 1 }).sum({axis: 1});
							df = this.dfd.concat({ dfList: [df, sub_df], axis: 1 });
							df.rename({ "0": column }, { inplace: true });
							break;
						case "x":
							for(ite=0; ite<sub_df2.$columns.length; ite++) {
								sub_df1 = sub_df1.mul(sub_df2.iloc({columns: [ite]}));
							}
							df = this.dfd.concat({ dfList: [df, sub_df1], axis: 1 });
							break;
						case "/":
							for(ite=0; ite<sub_df2.$columns.length; ite++) {
								sub_df1 = sub_df1.sub(sub_df2.iloc({columns: [ite]}));
							}
							df = this.dfd.concat({ dfList: [df, sub_df1], axis: 1 });
							break;
						default:
							throw new Error("Operator '" + operator + "' is not recognized for column operation");
							break;
					}
				}
			}
			
			return df;
		}
		
		// Concat
		concat(dataframes, axis) {
			
			var df = null;
			
			if(dataframes.length > 0) {
				
				var df_list = new Array();
				
				for(var ite=0; ite<dataframes.length; ite++) {
					df_list.push(this.newInternalDataFrame(dataframes[ite]));
				}
				
				df = this.dfd.concat({ dfList: df_list, axis: axis });
			}
			
			return df;
		}
		
		// Merge
		merge(dataframe_1, dataframe_2, on_columns, merging_mode) {
			
			var df1 = null;
			var df2 = null;
			var df = null;
			
			if((dataframe_1 != null) && (dataframe_2 != null)) {
				
				df1 = this.newInternalDataFrame(dataframe_1);
				df2 = this.newInternalDataFrame(dataframe_2);
				
				df = this.dfd.merge({ left: df1, right: df2, on: on_columns, how: merging_mode});
				
			}
			
			return df;
		}
    }

    window.customElements.define('com-sap-sample-sacdataframe', SACDataFrame);
})()
