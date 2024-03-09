import './SideCard.css';

export default function SideCard({ title, children }) {
    return (
        <>
            <div className="side-card">
                <div className="side-title">
                    { title }
                </div>
                { children }
            </div>
        </>
    )
}