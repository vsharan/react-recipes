import React, { Component } from "react";
import { Query } from "react-apollo";
import { SEARCH_RECIPES } from "../../queries";
import { Link } from "react-router-dom";

class Search extends Component {
    state = {
        searchTerm: ""
    }
    render() {
        const { searchTerm } = this.state;

        return (
            <div className="App">
            <h2 className="App">Search</h2>
            <input type="search" />
            <Query query={SEARCH_RECIPES} variables={{searchTerm}} >
                {({data, loading, error}) => {
                    if(loading) return <div>Loading...</div>
                    if(error) return <div>{error}</div>
                    return (
                    <div className="App">
                        <ul>
                            {data.searchRecipes.map(recipe => {
                               return( <li key={recipe._id}>
                                    <Link to={`/recipes/${recipe._id}`}><h4>{recipe.name}</h4></Link>
                                    <h4>{recipe.likes}</h4>
                                </li>)
                            })}
                        </ul>
                    </div>
                    )
                }}

            </Query>
                
            </div>
        );
    }
};

export default Search;