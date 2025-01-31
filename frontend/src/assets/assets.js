import p_img1 from './1.jpg'
import p_img2_1 from './2.jpg'
import p_img2_2 from './3.jpg'
import p_img2_3 from './4.jpg'
import p_img2_4 from './5.jpg'
import p_img3 from './6.jpg'
import p_img4 from './7.jpg'
import p_img5 from './8.jpg'
import p_img6 from './9.jpg'
import p_img7 from './10.jpg'
import p_img8 from './11.jpg'
import p_img9 from './12.jpg'
import p_img10 from './13.jpg'
import p_img11 from './14.jpg'
import p_img12 from './15.jpg'
import p_img13 from './16.jpg'
import p_img14 from './13.jpg'
import p_img15 from './17.jpg'
import p_img16 from './18.jpg'
import p_img17 from './19.jpg'
import p_img18 from './20.jpg'
import p_img19 from './21.jpg'
import p_img20 from './22.jpg'
import p_img21 from './23.jpg'
import p_img22 from './24.jpg'
import p_img23 from './25.jpg'
import p_img24 from './26.jpg'
import p_img25 from './27.jpg'
import p_img26 from './28.jpg'
import p_img27 from './29.jpg'
import p_img28 from './30.jpg'
import p_img29 from './31.jpg'
import p_img30 from './32.jpg'
import p_img31 from './33.jpg'
import p_img32 from './34.jpg'
import p_img33 from './35.jpg'
import p_img34 from './36.jpg'
import p_img35 from './37.jpg'
import p_img36 from './38.jpg'
import p_img37 from './39.jpg'
import p_img38 from './40.jpg'
import p_img39 from './41.jpg'
import p_img40 from './42.jpg'
import p_img41 from './43.jpg'
import p_img42 from './44.jpg'
import p_img43 from './45.jpg'
import p_img44 from './46.jpg'
import p_img45 from './47.jpg'
import p_img46 from './48.jpg'
import p_img47 from './49.jpg'
import p_img48 from './50.jpg'
import p_img49 from './51.jpg'
import p_img50 from './52.jpg'
import p_img51 from './53.jpg'
import p_img52 from './54.jpg'
import video1 from './1.mp4'


import logo from './logo_reefmaster.png'
import hero_img from './Underwater.jpg'
import cart_icon from './White_cart.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './White_profile.png'
import quality_icon from './quality_icon.png'
import search_icon from './White_search.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about_img from './Underwater2.jpg'
import contact_img from './contact_img.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import cross_icon from './cross_icon.png'
import go_shop from './go_shop.png'
import logo_hd from './logo_hd.png'

export const assets = {
    logo,
    hero_img,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_img,
    menu_icon,
    about_img,
    contact_img,
    razorpay_logo,
    stripe_logo,
    cross_icon,
    p_img11,
    go_shop,
    p_img12,
    p_img13,
    logo_hd,
    video1
}

export const products = [
    {
        _id: "aaaaa",
        name: "Acanthastrea A",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 100,
        image: [p_img1],
        category: "Culture",
        subCategory: "WYSIWYG Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716634345448,
        bestseller: true,
        type: "WYSIWYG",
        shipment: 1
    },
    {
        _id: "aaaab",
        name: "Acanthastrea B",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 200,
        image: [p_img2_1, p_img2_2, p_img2_3, p_img2_4],
        category: "Culture",
        subCategory: "WYSIWYG Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716621345448,
        bestseller: true,
        type: "WYSIWYG",
        shipment: 1
    },
    {
        _id: "aaaac",
        name: "Acanthastrea C",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 220,
        image: [p_img3],
        category: "Culture",
        subCategory: "WYSIWYG Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716234545448,
        bestseller: true,
        type: "WYSIWYG",
        shipment: 1
    },
    {
        _id: "aaaad",
        name: "Acanthastrea D",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 110,
        image: [p_img4],
        category: "Culture",
        subCategory: "WYSIWYG Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716621345448,
        bestseller: true,
        type: "WYSIWYG",
        shipment: 1
    },
    {
        _id: "aaaae",
        name: "Acanthastrea E",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 130,
        image: [p_img5],
        category: "Culture",
        subCategory: "WYSIWYG Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716622345448,
        bestseller: true,
        type: "WYSIWYG",
        shipment: 1
    },
    {
        _id: "aaaaf",
        name: "Acanthastrea F",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 140,
        image: [p_img6],
        category: "Culture",
        subCategory: "WYSIWYG Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716623423448,
        bestseller: true,
        type: "WYSIWYG",
        shipment: 1
    },
    {
        _id: "aaaag",
        name: "Acanthastrea G",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 190,
        image: [p_img7],
        category: "Culture",
        subCategory: "WYSIWYG Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716621542448,
        bestseller: false,
        type: "WYSIWYG",
        shipment: 1
    },
    {
        _id: "aaaah",
        name: "Acanthastrea H",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 140,
        image: [p_img8],
        category: "Culture",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716622345448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaaai",
        name: "Acanthastrea I",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 100,
        image: [p_img9],
        category: "Culture",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716621235448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaaaj",
        name: "Acanthastrea J",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 110,
        image: [p_img10],
        category: "Culture",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716622235448,
        bestseller: false,
        type: "General"
    },
    {
        _id: "aaaak",
        name: "Acanthastrea K",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 120,
        image: [p_img11],
        category: "Culture",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716623345448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaaal",
        name: "Acanthastrea L",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 150,
        image: [p_img12],
        category: "Culture",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716624445448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaaam",
        name: "Acanthastrea M",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 130,
        image: [p_img13],
        category: "Culture",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716625545448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaaan",
        name: "Acanthastrea N",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 160,
        image: [p_img14],
        category: "Culture",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716626645448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaaao",
        name: "Acanthastrea O",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 140,
        image: [p_img15],
        category: "Culture",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716627745448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaaap",
        name: "Acanthastrea P",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 170,
        image: [p_img16],
        category: "Culture",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716628845448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaaaq",
        name: "Acanthastrea Q",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 150,
        image: [p_img17],
        category: "Culture",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716629945448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaaar",
        name: "Acanthastrea R",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 180,
        image: [p_img18],
        category: "Culture",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716631045448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaaas",
        name: "Acanthastrea S",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 160,
        image: [p_img19],
        category: "Culture",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716632145448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaaat",
        name: "Acanthastrea T",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 190,
        image: [p_img20],
        category: "Culture",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716633245448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaaau",
        name: "Acanthastrea U",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 170,
        image: [p_img21],
        category: "Culture",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716634345448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaaav",
        name: "Acanthastrea V",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 200,
        image: [p_img22],
        category: "Culture",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716635445448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaaaw",
        name: "Acanthastrea W",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 180,
        image: [p_img23],
        category: "Culture",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716636545448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaaax",
        name: "Acanthastrea X",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 210,
        image: [p_img24],
        category: "Culture",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716637645448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaaay",
        name: "Acanthastrea Y",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 190,
        image: [p_img25],
        category: "Culture",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716638745448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaaaz",
        name: "Acanthastrea Z",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 220,
        image: [p_img26],
        category: "Culture",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716639845448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaaba",
        name: "Alveopora A",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 200,
        image: [p_img27],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716640945448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabb",
        name: "Alveopora B",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 230,
        image: [p_img28],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716642045448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabc",
        name: "Alveopora C",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 210,
        image: [p_img29],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716643145448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabd",
        name: "Alveopora D",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 240,
        image: [p_img30],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716644245448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabe",
        name: "Alveopora E",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 220,
        image: [p_img31],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716645345448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabf",
        name: "Alveopora F",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 250,
        image: [p_img32],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716646445448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabg",
        name: "Alveopora G",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 230,
        image: [p_img33],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716647545448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabh",
        name: "Alveopora H",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 260,
        image: [p_img34],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716648645448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabi",
        name: "Alveopora I",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 240,
        image: [p_img35],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716649745448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabj",
        name: "Alveopora J",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 270,
        image: [p_img36],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716650845448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabk",
        name: "Alveopora K",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 250,
        image: [p_img37],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716651945448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabl",
        name: "Alveopora L",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 280,
        image: [p_img38],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716653045448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabm",
        name: "Alveopora M",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 260,
        image: [p_img39],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716654145448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabn",
        name: "Alveopora N",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 290,
        image: [p_img40],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716655245448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabo",
        name: "Alveopora O",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 270,
        image: [p_img41],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716656345448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabp",
        name: "Alveopora P",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 300,
        image: [p_img42],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716657445448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabq",
        name: "Alveopora Q",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 280,
        image: [p_img43],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716658545448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabr",
        name: "Alveopora R",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 310,
        image: [p_img44],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716659645448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabs",
        name: "Alveopora S",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 290,
        image: [p_img45],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716660745448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabt",
        name: "Alveopora T",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 320,
        image: [p_img46],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716661845448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabu",
        name: "Alveopora U",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 300,
        image: [p_img47],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716662945448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabv",
        name: "Alveopora V",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 330,
        image: [p_img48],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716664045448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabw",
        name: "Alveopora W",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 310,
        image: [p_img49],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716665145448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabx",
        name: "Alveopora X",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 340,
        image: [p_img50],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716666245448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaaby",
        name: "Alveopora Y",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 320,
        image: [p_img51],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716667345448,
        bestseller: false,
        type: "General",
        shipment: 1
    },
    {
        _id: "aaabz",
        name: "Alveopora Z",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        price: 350,
        image: [p_img52],
        category: "Wild",
        subCategory: "General Hard Coral",
        sizes: [
            {
                size: "S", plasticSize: 17, r: 5.5, plasticHeight: 15,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "M", plasticSize: 20, r: 6.5, plasticHeight: 22,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "L", plasticSize: 22, r: 7, plasticHeight: 25,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            },
            {
                size: "XL", plasticSize: 25, r: 8, plasticHeight: 30,
                get volume() {
                    return (22 / 7) * (this.r ** 2) * this.plasticHeight;
                },
                get weight() {
                    return 0.75 * this.volume * 1.025;
                }
            }
        ],
        date: 1716668445448,
        bestseller: false,
        type: "General",
        shipment: 1
    }

]