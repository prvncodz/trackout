export function GoogleLoginButton() {
    return (

        <a href="/api/v1/user/google">
            <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-neutral-400 py-3 mt-3" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
                    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.5 30.2 0 24 0 14.6 0 6.6 5.5 2.7 13.5l7.9 6.1C12.5 13.1 17.8 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.1z" />
                    <path fill="#FBBC05" d="M10.6 28.4c-.5-1.3-.8-2.8-.8-4.4s.3-3.1.8-4.4l-7.9-6.1C1 16.6 0 20.2 0 24s1 7.4 2.7 10.5l7.9-6.1z" />
                    <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.6-5.9c-2 1.4-4.6 2.2-7.6 2.2-6.2 0-11.5-3.6-13.4-8.8l-7.9 6.1C6.6 42.5 14.6 48 24 48z" />
                </svg>
                Continue with Google
            </button>
        </a>
    )
}

