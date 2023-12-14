function MessageThumbnail({username, date, role}) {
    return (
        <div className="card border-primary mb-3">
            <div className="card-header">{date}</div>
            <div className="card-body text-primary">
                <h5 className="card-title">{username}</h5>
                <span class="badge rounded-pill text-bg-primary">{role}</span>
            </div>
        </div>
    )
}

export default MessageThumbnail;