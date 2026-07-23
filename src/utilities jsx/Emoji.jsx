import EMOJIS from "../js files/Emojis.js"
import { useState, useEffect } from "react";

function EmojiPicker({pickEmoji, close}) {

    const [emojiCategory, setEmojiCategory] = useState('work');
    const [emojiArray, setEmojiArray] = useState([]);

    useEffect(() => {

        let holder = [];

        holder = EMOJIS.filter(e => e.category === emojiCategory);

        setEmojiArray(holder);

    }, [emojiCategory])

    return ( 
        <div className="emoji-picker">
            
            <div className="emoji-labels">
                
                <i 
                    className={`bi bi-building ${emojiCategory === 'work' ? "text-[var(--accent)]" : ''}`} 
                    onClick={() => setEmojiCategory('work')} 
                    title="Work"    
                ></i>
                
                <i 
                    className={`bi bi-house ${emojiCategory === 'home' ? "text-[var(--accent)]" : ''}`}
                    onClick={() => setEmojiCategory('home')} 
                    title="Home"
                ></i>
                
                <i 
                    className={`bi bi-heart-pulse ${emojiCategory === 'health' ? "text-[var(--accent)]" : ''}`} 
                    onClick={() => setEmojiCategory('health')} 
                    title="Health"
                ></i>
                
                <i 
                    className={`bi bi-star ${emojiCategory === 'important' ? "text-[var(--accent)]" : ''}`}
                    onClick={() => setEmojiCategory('important')} 
                    title="Important"
                ></i>
                
                <i 
                    className={`bi bi-chat ${emojiCategory === 'social' ? "text-[var(--accent)]" : ''}`} 
                    onClick={() => setEmojiCategory('social')} 
                    title="Social"
                ></i>
                
                <i 
                    className={`bi bi-graph-up-arrow ${emojiCategory === 'growth' ? "text-[var(--accent)]" : ''}`} 
                    onClick={() => setEmojiCategory('growth')} 
                    title="Growth"
                ></i>

            </div>

            <div className="emoji-holder">
                {
                    emojiArray.map((e, i)=> {
                        return <span key={i} onClick={() => {
                            pickEmoji(e.emoji);
                            close();
                        }}>{e.emoji}</span>
                    })
                }
            </div>
        
        </div>
    );
}

export default EmojiPicker;