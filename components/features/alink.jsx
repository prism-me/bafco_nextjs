import Link from "next/link";

export default function ALink({ target, children, className, style, ...props }) {
    function defaultFunction(e) {
        if (props.href == '#') {
            e.preventDefault();
        }
    }

    return (
        <Link {...props}>
            <a className={className} target={target} style={style} onClick={defaultFunction}>
                {children}
            </a>
        </Link>
    )
}