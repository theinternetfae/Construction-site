import EMOJIS from "../js files/Emojis.js"

function EmojiPicker() {
    return ( 
        <div className="emoji-picker">
            
            <div className="emoji-labels">
                <i className="bi bi-building"></i>
                <i className="bi bi-house"></i>
                <i className="bi bi-heart-pulse"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-chat"></i>
                <i className="bi bi-people"></i>
                <i className="bi bi-graph-up-arrow"></i>
            </div>

            <div className="emoji-holder">
                {
                    EMOJIS.map(e => {
                        return <span>{e.emoji}</span>
                    })
                }
            </div>
        
        </div>
    );
}

export default EmojiPicker;