(function(htbt, React, toastr){
	var InlineEditCell = React.createClass({displayName: "InlineEditCell",
		getInitialState: function(){
	      	return { 
				data: this.props.data
			};
	    },
		render: function(){
	    	return (
	    		React.createElement("div", {className: "inline_edit_cell", onDoubleClick: this.show_edit}, 
	    			React.createElement("label", {ref: "lbl", className: "inline_edit_label", style: {display: 'block'}}, this.state.data), 
	    			React.createElement("input", {ref: "txt", className: "inline_edit_control", type: "text", onBlur: this.handle_blur, onChange: this.save_value, style: {display: 'none'}})
	    		)
	    	);
	  	},

	  	show_edit: function(){
	  		var txt = React.findDOMNode(this.refs.txt),
	  			lbl = React.findDOMNode(this.refs.lbl);

	  		lbl.style.display = 'none';
	  		txt.value = lbl.innerText;
	  		txt.style.display = 'block';
	  		txt.focus();
	  		txt.select();
	  		this.old_value = txt.value;
	  	},

	  	handle_blur: function(){
	  		var txt = React.findDOMNode(this.refs.txt);

	  		if(this.old_value !== txt.value && confirm('Are you sure to change this?')){
	  			this.save_value(txt.value);
	  			return;
	  		}

	  		this.hide_edit();
	  	},

	  	save_value: function(value){
	  		var that = this;

	  		$.ajax({ 
		  			url: htbt.config.backend + '/tag/popularity_factor',
				   	type: 'PUT',
				   	data: {
				   		tag_name: this.props.rowData.tag_name,
				   		popularity_factor: value
				   	}
				})
				.success(function () {
                    toastr.success('Change saved!');
                    that.setState({data: value});
                    that.hide_edit();
                })
                .fail(function () {
                    toastr.error('Something went wrong.');
                });
	  	},

	  	hide_edit: function(){
	  		React.findDOMNode(this.refs.txt).style.display = 'none';
	  		React.findDOMNode(this.refs.lbl).style.display = 'block';
	  	}
	});

	var GridContainer = React.createClass({displayName: "GridContainer",
		filter: '',
		filter_timeout: null,

		getInitialState: function(){
	      	return { 
				results: [],
			  	current_page: 0,
			  	max_pages: 0,
			  	results_per_page: 20,
			  	sort_column: null,
			  	sort_ascending: true
			};
	    },

		componentDidMount: function(){
			this.load_data();
		},

		render: function(){
			var columnMetadata = [
				{
					columnName: 'tag_name',
					displayName: 'Tag'
  				},
  				{
					columnName: 'video_count',
					displayName: 'Video Count'
  				},
  				{
					columnName: 'popularity_factor',
					displayName: 'Popularity Factor',
					customComponent: InlineEditCell
  				},
  				{
					columnName: 'tag_rank',
					displayName: 'Tag Rank'
  				}
			];

			return (
				React.createElement(Griddle, {
					useExternal: true, 
					showFilter: true, 
					columns: ['tag_name','video_count','popularity_factor','tag_rank'], 
					columnMetadata: columnMetadata, 
					getExternalData: this.load_data, 
					externalSetPage: this.set_page, 
			        externalChangeSort: this.change_sort, 
			        externalSetFilter: this.set_filter, 
			        externalSetPageSize: this.set_page_size, 
			        externalMaxPage: this.state.max_pages, 
			        externalCurrentPage: this.state.current_page, 
			        results: this.state.results, 
			        resultsPerPage: this.state.results_per_page, 
			        externalSortColumn: this.state.sort_column, 
			        externalSortAscending: this.state.sort_ascending})
			);
		},

		set_page: function(current_page){
			this.apply_change({current_page: current_page});
		},

		change_sort: function(sort_column, sort_ascending){
			this.apply_change({
				sort_column: sort_column, 
				sort_ascending: sort_ascending
			});	
		},

		set_filter: function(filter){
			var that = this;

			if(this.filter_timeout){
				clearTimeout(this.filter_timeout);
			}

			this.filter_timeout = setTimeout(function(){
				that.filter = filter;
				that.load_data();
			}, 300);
		},

		set_page_size: function(results_per_page){
			this.apply_change({results_per_page: results_per_page});
		},

		apply_change: function(change){
			this.setState(change);
			this.load_data(change);
		},

		load_data: function(option){
			var that = this,
				option = $.extend(this.state, option),
				page_size = option.results_per_page,
				query_parms = {
					filter: this.filter,
					skip: option.current_page * page_size,
					limit: page_size,
					sort_column: option.sort_column,
					sort_ascending: option.sort_ascending
				};
			
			$.get(htbt.config.backend + '/tag/search', query_parms)
				.done(function(results){
					that.setState({ 
						max_pages: Math.ceil(results.total/page_size),
						results: results.items
					});
				})
				.fail(function(error) {
					console.log(error);
				});
		}
	});

	React.render(React.createElement(GridContainer, null), document.getElementById("grid_container"))
})(window.htbt, window.React, window.toastr);