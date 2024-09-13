'use client';

import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function PrivatePage() {
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error || !data.session) {
                router.push('/login'); // Redirect to login if there's no session
            } else {
                console.log('User authenticated:', data.session.user);
            }
        };

        checkAuth();
    }, [router, supabase.auth]);

    return <p>Welcome! You are now logged in.</p>;
}
