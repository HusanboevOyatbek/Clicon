import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    CreditCard,
    Wallet,
    DollarSign,
    ShoppingBag,
    MapPin,
    Mail,
    Phone,
    User,
    Package
} from 'lucide-react';

const OrderPage = () => {
    const cart = useSelector((state) => state.cart);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        address: '',
        country: 'Uzbekistan',
        region: '',
        city: '',
        zipCode: '',
        email: '',
        phoneNumber: '',
        shipToDifferent: false,
        orderNotes: '',
        paymentMethod: 'cash'
    });

    // ============================================
    // TELEGRAM BOT SOZLAMALARI
    // ============================================
    const TELEGRAM_BOT_TOKEN = '8482684619:AAHbpRrt07ufQXpYZDmk77O7LVCIlWosG0A';
    const TELEGRAM_CHAT_ID = '6300637188';

    const uzbekistanRegions = [
        'Toshkent shahri',
        'Toshkent viloyati',
        'Samarqand',
        'Buxoro',
        'Andijon',
        'Farg\'ona',
        'Namangan',
        'Qashqadaryo',
        'Surxondaryo',
        'Xorazm',
        'Navoiy',
        'Jizzax',
        'Sirdaryo',
        'Qoraqalpog\'iston'
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Umumiy narxni hisoblash (CartPage logikasi bilan)
    const calculateSubtotal = () => {
        return cart.reduce((sum, el) => {
            sum += (el.price - el.price * el.discountPercentage / 100) * el.qty;
            return sum;
        }, 0);
    };

    const calculateDiscount = () => {
        const originalTotal = cart.reduce((sum, el) => sum + (el.price * el.qty), 0);
        return originalTotal - calculateSubtotal();
    };

    const calculateTax = () => {
        return calculateSubtotal() * 0.12; // 12% soliq
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax();
    };

    // Telegram'ga xabar yuborish funksiyasi
    const sendToTelegram = async () => {
        // Form validatsiya
        if (!formData.firstName || !formData.lastName) {
            alert('❌ Iltimos, ism va familiyangizni kiriting!');
            return false;
        }
        if (!formData.phoneNumber) {
            alert('❌ Iltimos, telefon raqamingizni kiriting!');
            return false;
        }
        if (!formData.address) {
            alert('❌ Iltimos, manzilni kiriting!');
            return false;
        }
        if (!formData.region || !formData.city) {
            alert('❌ Iltimos, viloyat va shaharni tanlang!');
            return false;
        }
        if (!formData.email) {
            alert('❌ Iltimos, emailni kiriting!');
            return false;
        }

        setIsLoading(true);

        try {
            // Xabar matnini yaratish
            let message = `🛒 *YANGI BUYURTMA*\n\n`;

            // Mijoz ma'lumotlari
            message += `👤 *MIJOZ MA'LUMOTLARI:*\n`;
            message += `━━━━━━━━━━━━━━━━━━━━\n`;
            message += `👨 Ism-Familiya: *${formData.firstName} ${formData.lastName}*\n`;
            if (formData.companyName) {
                message += `🏢 Kompaniya: ${formData.companyName}\n`;
            }
            message += `📱 Telefon: *${formData.phoneNumber}*\n`;
            message += `📧 Email: ${formData.email}\n`;
            message += `📍 Manzil: ${formData.address}\n`;
            message += `🏙 Shahar: ${formData.city}\n`;
            message += `🗺 Viloyat: ${formData.region}\n`;
            message += `🇺🇿 Mamlakat: ${formData.country}\n`;
            if (formData.zipCode) {
                message += `📮 Pochta indeksi: ${formData.zipCode}\n`;
            }
            message += `\n`;

            // Buyurtma mahsulotlari
            message += `📦 *BUYURTMA MAHSULOTLARI:*\n`;
            message += `━━━━━━━━━━━━━━━━━━━━\n`;

            cart.forEach((item, index) => {
                const discountedPrice = item.price - (item.price * item.discountPercentage / 100);
                const itemTotal = discountedPrice * item.qty;

                message += `${index + 1}. *${item.title}*\n`;
                message += `   💵 Narx: $${item.price.toFixed(2)} `;
                if (item.discountPercentage > 0) {
                    message += `(-${item.discountPercentage}%) → $${discountedPrice.toFixed(2)}`;
                }
                message += `\n`;
                message += `   📊 Miqdor: ${item.qty} dona\n`;
                message += `   💰 Jami: *$${itemTotal.toFixed(2)}*\n\n`;
            });

            // Hisob-kitob
            message += `💳 *HISOB-KITOB:*\n`;
            message += `━━━━━━━━━━━━━━━━━━━━\n`;
            message += `📦 Mahsulotlar soni: ${cart.length} ta\n`;
            message += `💵 Oraliq summa: $${calculateSubtotal().toFixed(2)}\n`;

            if (calculateDiscount() > 0) {
                message += `🎁 Chegirma: -$${calculateDiscount().toFixed(2)}\n`;
            }

            message += `🚚 Yetkazib berish: *BEPUL*\n`;
            message += `📊 Soliq (12%): $${calculateTax().toFixed(2)}\n`;
            message += `━━━━━━━━━━━━━━━━━━━━\n`;
            message += `💰 *JAMI SUMMA: $${calculateTotal().toFixed(2)}*\n\n`;

            // To'lov usuli
            const paymentMethodNames = {
                'cash': '💵 Naqd pul',
                'venmo': '💳 Venmo',
                'paypal': '💳 Paypal',
                'amazon': '💳 Amazon Pay',
                'card': '💳 Plastik karta'
            };
            message += `💳 To'lov usuli: *${paymentMethodNames[formData.paymentMethod]}*\n`;

            // Qo'shimcha izohlar
            if (formData.orderNotes) {
                message += `\n📝 *Qo'shimcha izoh:*\n${formData.orderNotes}\n`;
            }

            // Vaqt
            const now = new Date();
            const timeString = now.toLocaleString('uz-UZ', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            message += `\n⏰ Buyurtma vaqti: ${timeString}`;

            // Telegram API ga so'rov yuborish
            const response = await fetch(
                `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: message,
                        parse_mode: 'Markdown'
                    })
                }
            );

            const data = await response.json();

            if (data.ok) {
                alert('✅ Buyurtma muvaffaqiyatli yuborildi!\n\nTez orada siz bilan bog\'lanamiz.\n\nRahmat! 🎉');

                // Formani tozalash
                setFormData({
                    firstName: '',
                    lastName: '',
                    companyName: '',
                    address: '',
                    country: 'Uzbekistan',
                    region: '',
                    city: '',
                    zipCode: '',
                    email: '',
                    phoneNumber: '',
                    shipToDifferent: false,
                    orderNotes: '',
                    paymentMethod: 'cash'
                });

                return true;
            } else {
                console.error('Telegram API xatosi:', data);
                alert('❌ Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.\n\nXatolik: ' + (data.description || 'Noma\'lum xatolik'));
                return false;
            }
        } catch (error) {
            console.error('Xatolik:', error);
            alert('❌ Serverga ulanishda xatolik!\n\nIltimos:\n1. Internet aloqani tekshiring\n2. Telegram bot sozlamalarini tekshiring\n3. Qayta urinib ko\'ring');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (cart.length === 0) {
            alert('❌ Savat bo\'sh! Iltimos, avval mahsulot qo\'shing.');
            return;
        }

        await sendToTelegram();
    };

    const paymentMethods = [
        { id: 'cash', name: 'Naqd pul', icon: DollarSign },
        { id: 'venmo', name: 'Venmo', icon: Wallet },
        { id: 'paypal', name: 'Paypal', icon: CreditCard },
        { id: 'amazon', name: 'Amazon Pay', icon: ShoppingBag },
        { id: 'card', name: 'Plastik karta', icon: CreditCard }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                    <span>Bosh sahifa</span>
                    <span>/</span>
                    <span>Savat</span>
                    <span>/</span>
                    <span className="text-gray-900 font-semibold">Buyurtma berish</span>
                </div>

                <h1 className="text-3xl font-bold mb-8">Buyurtma berish</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Section - Billing Information */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Billing Information */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <User className="w-6 h-6 text-blue-600" />
                                Shaxsiy ma'lumotlar
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="Ism *"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Familiya *"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="companyName"
                                    placeholder="Kompaniya nomi (ixtiyoriy)"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="mb-4">
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Manzil *"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                                    disabled
                                >
                                    <option value="Uzbekistan">O'zbekiston</option>
                                </select>
                                <select
                                    name="region"
                                    value={formData.region}
                                    onChange={handleInputChange}
                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Viloyat/Shaharni tanlang *</option>
                                    {uzbekistanRegions.map(region => (
                                        <option key={region} value={region}>{region}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="Shahar/Tuman *"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                                <input
                                    type="text"
                                    name="zipCode"
                                    placeholder="Pochta indeksi (ixtiyoriy)"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email *"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        placeholder="Telefon raqam *"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="shipToDifferent"
                                        checked={formData.shipToDifferent}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">Boshqa manzilga yetkazib berish</span>
                                </label>
                            </div>
                        </div>

                        {/* Payment Option */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <CreditCard className="w-6 h-6 text-blue-600" />
                                To'lov usuli
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                                {paymentMethods.map(({ id, name, icon: Icon }) => (
                                    <button
                                        key={id}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: id }))}
                                        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${formData.paymentMethod === id
                                                ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                                                : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                                            }`}
                                    >
                                        <Icon className={`w-7 h-7 ${formData.paymentMethod === id ? 'text-blue-600' : 'text-gray-600'}`} />
                                        <span className={`text-xs font-medium text-center ${formData.paymentMethod === id ? 'text-blue-600' : 'text-gray-600'}`}>
                                            {name}
                                        </span>
                                        {formData.paymentMethod === id && (
                                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {formData.paymentMethod === 'card' && (
                                <div className="space-y-4 mt-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                                    <input
                                        type="text"
                                        placeholder="Karta egasining ismi"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Karta raqami"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="OY/YIL"
                                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <input
                                            type="text"
                                            placeholder="CVV"
                                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Additional Information */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold mb-4">Qo'shimcha ma'lumot</h2>
                            <label className="block text-sm text-gray-600 mb-2">Buyurtma uchun izoh (ixtiyoriy)</label>
                            <textarea
                                name="orderNotes"
                                value={formData.orderNotes}
                                onChange={handleInputChange}
                                placeholder="Buyurtmangiz haqida qo'shimcha ma'lumot, masalan, yetkazib berish uchun maxsus ko'rsatmalar"
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                        </div>
                    </div>

                    {/* Right Section - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Package className="w-6 h-6 text-blue-600" />
                                Buyurtma xulosasi
                            </h2>

                            {/* Mahsulotlar ro'yxati */}
                            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-3 pb-3 border-b">
                                        <div className="relative">
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                                {item.qty}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-sm line-clamp-2 mb-1">{item.title}</h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-500 line-through">${item.price.toFixed(2)}</span>
                                                <span className="text-sm font-bold text-green-600">
                                                    ${(item.price - item.price * item.discountPercentage / 100).toFixed(2)}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {item.qty} × ${(item.price - item.price * item.discountPercentage / 100).toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-blue-600">
                                                ${((item.price - item.price * item.discountPercentage / 100) * item.qty).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {cart.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                        <p className="text-sm">Savat bo'sh</p>
                                    </div>
                                )}
                            </div>

                            {/* Hisob-kitob */}
                            <div className="space-y-3 border-t pt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Mahsulotlar soni:</span>
                                    <span className="font-semibold">{cart.length}</span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Oraliq summa:</span>
                                    <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
                                </div>

                                {calculateDiscount() > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Chegirma:</span>
                                        <span className="font-semibold text-green-600">-${calculateDiscount().toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Yetkazib berish:</span>
                                    <span className="font-semibold text-green-600">Bepul</span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Soliq (12%):</span>
                                    <span className="font-semibold">${calculateTax().toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between text-xl font-bold border-t pt-3 mt-3">
                                    <span>Jami:</span>
                                    <span className="text-blue-600">${calculateTotal().toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={cart.length === 0 || isLoading}
                                className={`w-full mt-6 py-4 rounded-lg font-bold text-white transition-all shadow-lg ${cart.length === 0 || isLoading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:-translate-y-0.5'
                                    }`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        YUBORILMOQDA...
                                    </span>
                                ) : (
                                    'BUYURTMA BERISH →'
                                )}
                            </button>

                            <p className="text-xs text-gray-500 text-center mt-3">
                                Buyurtma berishda siz shartlar va qoidalarga rozilik bildirasiz
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;