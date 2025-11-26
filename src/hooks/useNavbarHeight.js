import { useState, useEffect } from 'react';

export function useNavbarHeight() {
    const [navbarHeight, setNavbarHeight] = useState(124);

    useEffect(() => {
        const updateNavbarHeight = () => {
            const navbar = document.querySelector('nav');
            if (navbar) {
                setNavbarHeight(navbar.offsetHeight);
            }
        };

        updateNavbarHeight();

        window.addEventListener('resize', updateNavbarHeight);

        const navbar = document.querySelector('nav');
        if (navbar) {
            const observer = new MutationObserver(updateNavbarHeight);
            observer.observe(navbar, {
                childList: true,
                subtree: true,
                attributes: true
            });

            return () => {
                observer.disconnect();
                window.removeEventListener('resize', updateNavbarHeight);
            };
        }

        return () => {
            window.removeEventListener('resize', updateNavbarHeight);
        };
    }, []);

    return navbarHeight;
}