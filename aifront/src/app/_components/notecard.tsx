

interface NoteCardProps {
    id: number;
    title: string;
    // content: string;
}

const NoteCard = (props: NoteCardProps) => {
    return (
        <div className="card">
            <div className="card-body">
                <h6 className="card-title">{props.title}</h6>
                {/* <p className="card-text">{props.content}</p> */}
            </div>
        </div>
    );
};

export default NoteCard;