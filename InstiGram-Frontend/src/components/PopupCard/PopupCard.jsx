import './PopupCard.css';

export default function PopupCard({ children }) {
    return (
        <>
            <div className="popup-card">
                { children }
            </div>
        </>
    )
}