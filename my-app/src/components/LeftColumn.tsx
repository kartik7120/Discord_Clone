import { createStyles } from "@mantine/core";
const useStyles = createStyles((theme, _params, getRef) => ({
    left_column_class: {
        backgroundColor: theme.colors.discord_palette[2]
    }
}))
function LeftColumn() {
    const { classes } = useStyles();
    return <div className={classes.left_column_class}>
        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa voluptatum
            blanditiis itaque quod obcaecati nesciunt iste facere provident error. Pariatur ipsa
            quidem cupiditate, earum porro iure exercitationem nulla sapiente ea.
            Dolorem sequi officiis repudiandae eaque
            ab in, aliquam omnis, consequuntur optio vero unde quaerat
            fugit atque amet accusantium, facilis nihil. Error maiores veritatis voluptatum id
            aliquam quos molestias, quia eius.
        </span>
    </div>

}
export default LeftColumn;