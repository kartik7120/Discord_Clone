import { Skeleton } from "@mantine/core";
function ChatSkeleton() {
    return (
        <>
            <div style={{ marginBottom: "2em" }}>
                <Skeleton height={50} circle style={{
                    marginBottom: "1em"
                }} />
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
            </div>
            <div style={{ marginBottom: "2em" }}>
                <Skeleton height={50} circle style={{
                    marginBottom: "1em"
                }} />
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
            </div>
            <div style={{ marginBottom: "2em" }}>
                <Skeleton height={50} circle style={{
                    marginBottom: "1em"
                }} />
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
            </div>
            <div style={{ marginBottom: "2em" }}>
                <Skeleton height={50} circle style={{
                    marginBottom: "1em"
                }} />
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
            </div>
        </>
    )
}
export default ChatSkeleton;