function updateMarquee() {
    const content = [
        'Welcome, Travelers!',
        'Plan Your Journey with Us!',
        'Discover Your Next Destination!',
        'Travel Smart, Travel Safe!',
        'Your Trip, Our Forecast!',
        'Welcome, Adventurers!',
        'Explore the World, One Forecast at a Time!',
        'Know Before You Go!',
        'Weather the World with Us!',
        'Start Your Adventure Here!',
        'Your Journey Starts with a Forecast!'
    ];

    let key = 0;
    const marquee = document.querySelector('.marquee');

    marquee.addEventListener('animationstart', () => {
        key = 0;
        marquee.textContent = content[key];
    });

    marquee.addEventListener('animationiteration', () => {
        key++;
        if (typeof content[key] === 'undefined') key = 0;
        marquee.textContent = content[key];
    });

    marquee.classList.remove('paused');
}

// Call the function when the page is loaded
updateMarquee();

export { updateMarquee };
