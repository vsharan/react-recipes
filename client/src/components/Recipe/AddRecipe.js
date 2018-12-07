import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { ADD_RECIPE, GET_ALL_RECIPES } from "../../queries";
import Error from "../Error";
import { withRouter } from "react-router-dom";

const initialState = {
    name: "",
    category: "Breakfast",
    instructions: "",
    description: "",
    username: ""
};

class AddRecipe extends Component {
    state = { ...initialState };

    componentDidMount() {
        this.setState({
            username: this.props.session.getCurrentUser.username
        });
    }

    clearState = () => {
        this.setState({ ...initialState });
    }

    validateForm = () => {
        const { name, category, description, instructions } = this.state;
        const isInvalid = !name || !category || !description || !instructions;
        return isInvalid;
    }
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event, addRecipe) => {
        event.preventDefault();
        addRecipe().then(({ data }) => {
            console.log(data);
            this.clearState();
            this.props.history.push("/");
        }).catch(error => {
            console.log(error);
        })
    }

    updateCache = (cache, { data: { addRecipe } }) => {
        const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });
        cache.writeQuery({
            query: GET_ALL_RECIPES,
            data: {
                getAllRecipes: [addRecipe, ...getAllRecipes]
            }
        });
    }

    render() {
        const { name, category, instructions, description, username } = this.state;
        return (<Mutation
            mutation={ADD_RECIPE}
            variables={{ name, category, instructions, description, username }}
            update={this.updateCache}
        >
            {(addRecipe, { data, loading, error }) => {
                if (loading) return <div>Loading...</div>
                if (error) return <div>Error</div>
                return (
                    <div className="App">
                        <h2 className="App">Add Recipe</h2>
                        <form className="form" onSubmit={(event) => this.handleSubmit(event, addRecipe)}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Add Name"
                                value={name}
                                onChange={this.handleChange}
                            />
                            <select name="category" value={category} onChange={this.handleChange}>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Snack">Snack</option>
                            </select>
                            <input
                                type="text"
                                name="description"
                                placeholder="Add description"
                                value={description}
                                onChange={this.handleChange}
                            />
                            <textarea
                                name="instructions"
                                placeholder="Add instructions"
                                value={instructions}
                                onChange={this.handleChange}
                            />
                            <button className="button-primary" disabled={loading || this.validateForm()}>
                                Submit
                    </button>
                            {error && <Error error={error} />}
                        </form>
                    </div>
                );
            }}

        </Mutation>);
    }
}

export default withRouter(AddRecipe);
