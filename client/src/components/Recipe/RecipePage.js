import React from "react";
import { withRouter } from "react-router-dom";

const RecipePage = ({ match }) => {
    const { _id } = match.params;
    
    return <div>Racipe Page</div>

};

export default withRouter(RecipePage);
