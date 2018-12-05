import jwt from "jsonwebtoken";
import { User } from "./models/User";
import bcrypt from "bcrypt";

export const createToken =(user, secret, expiresIn)=> {
    const { username, email} = user;
    return jwt.sign({username, email}, secret, {expiresIn});
}

export const resolvers = {
    Query: {
        getAllRecipes: async (root, { }, { Recipe }) => {
            return Recipe.find();
        },
        getCurrentUser: async (root, {}, {currentUser, User}) => {
            if(!currentUser) {
                return null;
            }

            let user = await User.findOne({username: currentUser.username})
            .populate({
                path: "favorites",
                model: "Recipe"
            });

            console.log(JSON.stringify(user));

            return user;
        }
    },
    Mutation: {
        addRecipe: async (root, { name, description, category, instructions, username }, { Recipe }) => {
            const newRecipe = await new Recipe({
                name,
                description,
                category,
                instructions,
                username
            }).save();

            return newRecipe;
        },
        signinUser: async (root, {username, password}, {User}) => {
            const user = await User.findOne({username});

            if(!user) {
                throw new Error('User not found');
            }

            const isValidPassword = await bcrypt.compare(password, user.password);

            if(!isValidPassword) {
                throw new Error("Invalid password");
            }

            return {token: createToken(user, process.env.SECRET, '1hr')};

        },
        signupUser: async ( root, {username, email, password}, {User}) => {
            const user = await User.findOne({username});
            if(user) {
                throw new Error(`User already exists`);
            }

            const newUser = new User({
                username,
                email,
                password
            }).save();

            return {token: createToken(newUser, process.env.SECRET, '1hr')};
        }
    }

}