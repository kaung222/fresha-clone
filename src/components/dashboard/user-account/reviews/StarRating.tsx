import { Star } from 'lucide-react';
import React from 'react'

type Props = {
    rating: number;
}

const StarRating = ({ rating }: Props) => {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`h-5 w-5 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
                        }`}
                />
            ))}
        </div>
    )
}

export default StarRating