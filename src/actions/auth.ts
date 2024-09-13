'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'


export async function login(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { data: loginRes, error } = await supabase.auth.signInWithPassword(data)
    console.log("login data", loginRes)
    console.log("login error", error)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { data: signupRes,  error } = await supabase.auth.signUp(data)
    console.log("signup data", signupRes)
    console.log("signup error", error)
    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

// export const passwordlessLogin = async (formData: FormData) => {
//     const supabase = await createClient();

//     const email = formData.get('email') as string;

//     const { data, error } = await supabase.auth.signInWithOtp({ email });
//     console.log("response data from passwordlessLogin", data)

//     if (error) {
//         throw new Error('Failed to send magic link');
//     }
// }


export const signInWithEmail = async (formData: FormData) => {
    const supabase = await createClient()

    const email = formData.get('email') as string;
    console.log("email", email)
    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            shouldCreateUser: true,
            // emailRedirectTo: 'http://localhost:3000/chat',
            emailRedirectTo: 'https://automate-travel.vercel.app/chat',
        },
    })

    console.log("data", data, error)
}

export const signOut = async () => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log('Error signing out:', error);
        throw new Error('Failed to log out');
    }

    console.log('User signed out successfully');
};




// export async function getUserInfo() {
//     const supabase = await createClient()
//     const user = await supabase.auth.getUser()
//     return user
// }

// export async function signup(formData: FormData) {
//     const supabase = await createClient()

//     const data = {
//         email: formData.get('email') as string,
//         password: formData.get('password') as string,
//     }

//     const { error } = await supabase.auth.signUp(data)

//     if (error) {
//         redirect(`/login?message=Error signing up ${error.message}`)
//     }

//     revalidatePath('/', 'layout')
//     redirect('/login')
// }

// export async function signOut() {
//     const supabase = await createClient();
//     await supabase.auth.signOut();
//     redirect('/login')
// }

export async function googleLogin() {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    console.log("user", user)
    const origin = headers().get('origin');
    const { error, data } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    });

    console.log('sign in with google data', data);

    if (error) {
        console.log(error);
    } else {
        console.log("trying to rediredt to");
        redirect(data.url);
    }
}



// export async function oAuthSignIn(provider: Provider) {
//     if (!provider) {
//         return redirect('/login?message=No provider selected')
//     }

//     const supabase = await createClient();
//     const redirectUrl = "http://localhost:3000//auth/callback"
//     const { data, error } = await supabase.auth.signInWithOAuth({
//         provider,
//         options: {
//             redirectTo: redirectUrl,
//         }
//     })

//     if (error) {
//         redirect('/login?message=Could not authenticate user')
//     }

//     return redirect(data.url)
// }