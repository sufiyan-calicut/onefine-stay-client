import * as Yup from 'yup';

export const AddroomSchema = Yup.object({
    room_name:Yup.string().min(4).max(8).required('Enter a unique name!'),
    category:Yup.string().min(4).max(8).required('Choose a category!'),
    rent:Yup.number().required('Enter rent / day!'),

    // image:Yup.string().min(4).max(8).required('add images!'),

    // email: Yup.string().email().required('Please enter your email'),
    // password: Yup.string().min(6).required('Please enter your password'),
    // confirmPassword: Yup.string().required().oneOf([Yup.ref('password'), null, "Password must match"])


})

// * recieve rent as string i should parse it into integer in backend