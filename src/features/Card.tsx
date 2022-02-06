import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import {Button, Card, CardActions, CardMedia} from "@material-ui/core";
import productWaffles from '../assets/images/products/products_img.jpg'
import familyShot from '../assets/images/products/bt-products-family-shot.png'

export const ProductCard = () => {
    return (
        <Card >
            <CardContent>
                <CardMedia
                    component="img"
                    alt="waffles"
                    height="140"
                    image={productWaffles}
                />
                123
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}


