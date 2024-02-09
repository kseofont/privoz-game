import React from 'react';

const EventCard = ({ card }) => {
    return (
        <div>
            <h4>{card.name}</h4>
            <p><strong>Description:</strong> {card.description}</p>
            <p><strong>Location:</strong> {card.location}</p>
            <p><strong>Fortune:</strong> {card.fortune}</p>
            {/* Add other properties you want to display */}
        </div>
    );
};

export default EventCard;
