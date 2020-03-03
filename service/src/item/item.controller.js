import { connect, close, parseMongooseErrors } from '../util';
import ItemModel from './item.model.js';

export async function getItems() {
    connect();
    try {
        const result = await ItemModel.find();
        close();
        return result;
    } catch (error) {
        close();
        parseMongooseErrors(error);
    }
}

export async function addItem(_, item) {
    connect();
    try {
        const result = await ItemModel.create(item);
        close();
        return result;
    } catch (error) {
        close();
        parseMongooseErrors(error);
    }
}

export async function updateItem(_, item) {
    connect();
    try {
        const { id, ...updatedFields } = item;
        const result = await ItemModel.findByIdAndUpdate(id, updatedFields, {
            new: true,
            runValidators: true
        });
        close();
        return result;
    } catch (error) {
        close();
        parseMongooseErrors(error);
    }
}

export async function deleteItem(_, { id }) {
    connect();
    try {
        const result = await ItemModel.findOneAndRemove({ _id: id });
        close();
        const { _id } = result;
        return _id;
    } catch (error) {
        close();
        parseMongooseErrors(error);
    }
}

export async function addStarterItems() {
    const TEMPLATE_ITEMS = [
        {
            name: 'Logitech Wireless Solar Keyboard K750',
            quantity: 41,
            link:
                'https://www.logitech.com/en-us/product/wireless-solar-keyboard-k750-mac?crid=27'
        },
        {
            name: 'Microsoft Natural Ergonomic Keyboard 4000',
            quantity: 3,
            link:
                'https://www.microsoft.com/accessories/en-us/products/keyboards/natural-ergonomic-keyboard-4000/b2m-00012'
        },
        {
            name: 'Apple Magic Mouse 2',
            quantity: 30,
            link:
                'https://www.apple.com/shop/product/MLA02LL/A/magic-mouse-2-silver?fnode=56'
        },
        {
            name: 'Hattefjäll Office chair',
            quantity: 24,
            link:
                'https://www.ikea.com/us/en/p/hattefjaell-office-chair-with-armrests-smidig-black-black-s79305201/'
        },
        {
            name: 'Formula Series Conventional Gaming Chair Mesh FD01/NR',
            quantity: 6,
            link:
                'https://www.dxracer.com/us/en-us/product/1/gaming-chairs/formula-and-racing-series/oh-fd01-nr/'
        },
        {
            name: 'Dell S-Pro 27 Monitor: S2719HS',
            quantity: 23,
            link:
                'https://www.dell.com/en-us/work/shop/dell-s-pro-27-monitor-s2719hs/apd/210-audl/monitors-monitor-accessories'
        },
        {
            name:
                "LG 34'' Class 21:9 UltraWide® 5K2K Nano IPS LED Monitor with HDR 600",
            quantity: 11,
            link:
                'https://www.lg.com/us/monitors/lg-34WK95U-W-ultrawide-monitor'
        },
        {
            name: 'UPLIFT V2 Standing Desk',
            quantity: 16,
            link:
                'https://www.upliftdesk.com/uplift-v2-standing-desk-v2-or-v2-commercial/'
        },
        {
            name: 'Eloquent JavaScript',
            quantity: 4,
            link:
                'https://www.amazon.com/Eloquent-JavaScript-Modern-Introduction-Programming/dp/1593272820'
        },
        {
            name: 'La Marzocco Espresso machine',
            quantity: 2,
            link: 'https://lamarzoccousa.com/machine/linea-pb/'
        },
        {
            name: 'Yoga ball',
            quantity: 8,
            link: ''
        },
        {
            name: 'Fork',
            quantity: 30,
            link:
                'https://www.ikea.com/us/en/p/dragon-salad-dessert-fork-stainless-steel-30090382/'
        },
        {
            name: 'Knife',
            quantity: 29,
            link: 'https://www.ikea.com/us/en/p/snitta-knife-black-00287295/'
        },
        {
            name: 'Spoon',
            quantity: 34,
            link:
                'https://www.ikea.com/us/en/p/dragon-spoon-stainless-steel-30091763/'
        },
        {
            name: 'Chopstick',
            quantity: 34,
            link: 'https://www.ikea.com/us/en/p/trebent-chopsticks-4-pairs-'
        },
        {
            name: 'Pedestal fan',
            quantity: 8,
            link:
                'https://www.homedepot.com/p/Lasko-Cyclone-18-in-Adjustable-Pedestal-Fan-1823/202563946'
        },
        {
            name: 'Water cooler',
            quantity: 2,
            link:
                'https://www.homedepot.com/p/Avalon-Top-Loading-Hot-and-Cold-Water-Cooler-Dispenser-A2TLWATERCOOLER/301872392'
        },
        {
            name: 'HP LaserJet Pro MFP M130 series',
            quantity: 3,
            link:
                'https://support.hp.com/us-en/drivers/selfservice/hp-laserjet-pro-mfp-m130-series/9365370?jumpid=in_r11839_us/en/SWDLanding/TopProducts'
        },
        {
            name: '12oz coffee beans',
            quantity: 2,
            link: 'https://www.stumptowncoffee.com/products/hair-bender'
        },
        {
            name: 'Drinking glasses',
            quantity: 16,
            link: 'https://www.crateandbarrel.com/felton-highball-glass/s443358'
        },
        {
            name: 'Samsung UE590 Series 28" LED 4K UHD Monitor',
            quantity: 3,
            link:
                'https://www.bestbuy.com/site/samsung-ue590-series-28-led-4k-uhd-monitor-black/5484022.p?skuId=5484022'
        }
    ];

    try {
        connect();
        const result = await ItemModel.create(TEMPLATE_ITEMS);
        close();
        return result;
    } catch (error) {
        close();
        parseMongooseErrors(error);
    }
}
