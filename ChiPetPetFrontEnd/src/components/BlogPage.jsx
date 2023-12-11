import BlogPostBubble from "./BlogPostBubble";
import { Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { PanelContext } from "../contexts/panelContext";

const BlogPage = (props) => {
    const { currentPanel, setCurrentPanel } = useContext(PanelContext);

    const posts = [
        {
            name: "Ahmet",
            role: "user",
            date: "12 November 2023",
            time: "12:45",
            content: "sdpaosdasldasldşasmasdnaskdnaksndkjasnc"
        },
        {
            name: "Mehmet",
            role: "expert",
            date: "12 November 2023",
            time: "12:45",
            content: "sdpaosdasldasldşasmasdnaskdnaksndkjasnc"
        }, {
            name: "Necdet",
            role: "user",
            date: "12 November 2023",
            time: "12:45",
            content: "sdpaosdasldasldşasmasdnaskdnaksndkjasnc"
        },
        {
            name: "Ahmet",
            role: "user",
            date: "12 November 2023",
            time: "12:45",
            content: "sdpaosdasldasldşasmasdnaskdnaksndkjasnc"
        },
        {
            name: "Mehmet",
            role: "expert",
            date: "12 November 2023",
            time: "12:45",
            content: "sdpaosdasldasldşasmasdnaskdnaksndkjasnc"
        }, {
            name: "Necdet",
            role: "user",
            date: "12 November 2023",
            time: "12:45",
            content: "sdpaosdasldasldşasmasdnaskdnaksndkjasnc"
        },
    ]
    return (
        <div className="d-flex flex-column p-3 w-100 h-100 gap-3">
            <div>
                <Button className="position-relative top-2 start-2" onClick={() => setCurrentPanel("back")}>
                    Back
                </Button>
            </div>
            <div style={{ flex: "2 2 0", overflowY: "scroll" }}>
                <div className="gap-5 p-3" style={{ flex: "2 2 0", border: "1px solid", overflowY: "scroll" }}>
                    {posts.map((e, i) => (
                        <BlogPostBubble key={i} postObject={e} />
                    ))}
                </div>

            </div>
            <div style={{ flex: "1 1 0", border: "1px solid" }}>
                <div className="form-floating h-100 mb-3">
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100%" }}></textarea>
                    <label htmlFor="floatingTextarea2">Comments</label>
                </div>
            </div>
            <Button className="w-100">
                Send
            </Button>
        </div>
    )
}

export default BlogPage;