'use client'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../src/store/store';
import { updatePreferences } from '../../../src/store/slices/authSlice';
import { 
  Card, 
  CardBody, 
  CardHeader,
  Switch,
  Select,
  SelectItem,
  Button,
  Divider
} from '@heroui/react';
import { Bell, Globe, Mail, MessageSquare, Shield, CreditCard } from 'lucide-react';

export default function SettingsPage() {
  const dispatch = useDispatch();
  const { preferences } = useSelector((state: RootState) => state.auth);

  const handleNotificationChange = (type: string, value: boolean) => {
    dispatch(updatePreferences({
      emailNotifications: {
        ...preferences.emailNotifications,
        [type]: value
      }
    }));
  };

  const languages = [
    { key: 'en', label: 'English' },
    { key: 'fr', label: 'Français' },
    { key: 'es', label: 'Español' },
  ];

  const currencies = [
    { key: 'USD', label: 'USD - US Dollar' },
    { key: 'EUR', label: 'EUR - Euro' },
    { key: 'GBP', label: 'GBP - British Pound' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      {/* Preferences */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Globe className="text-gray-600" size={20} />
          <h2 className="text-xl font-semibold">Preferences</h2>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Language"
              selectedKeys={[preferences.language]}
              onSelectionChange={(keys) => 
                dispatch(updatePreferences({ language: Array.from(keys)[0] as any }))
              }
            >
              {languages.map((lang) => (
                <SelectItem key={lang.key} value={lang.key}>
                  {lang.label}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Currency"
              selectedKeys={[preferences.currency]}
              onSelectionChange={(keys) => 
                dispatch(updatePreferences({ currency: Array.from(keys)[0] as any }))
              }
            >
              {currencies.map((curr) => (
                <SelectItem key={curr.key} value={curr.key}>
                  {curr.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </CardBody>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Bell className="text-gray-600" size={20} />
          <h2 className="text-xl font-semibold">Notifications</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Mail className="text-gray-600" size={18} />
                <div>
                  <p className="font-medium">Order Updates</p>
                  <p className="text-sm text-gray-600">
                    Receive emails about your order status
                  </p>
                </div>
              </div>
              <Switch
                isSelected={preferences.emailNotifications.orders}
                onValueChange={(value) => handleNotificationChange('orders', value)}
              />
            </div>

            <Divider />

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Mail className="text-gray-600" size={18} />
                <div>
                  <p className="font-medium">Promotions</p>
                  <p className="text-sm text-gray-600">
                    Receive promotional offers and discounts
                  </p>
                </div>
              </div>
              <Switch
                isSelected={preferences.emailNotifications.promotions}
                onValueChange={(value) => handleNotificationChange('promotions', value)}
              />
            </div>

            <Divider />

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Mail className="text-gray-600" size={18} />
                <div>
                  <p className="font-medium">Newsletter</p>
                  <p className="text-sm text-gray-600">
                    Receive our weekly newsletter
                  </p>
                </div>
              </div>
              <Switch
                isSelected={preferences.emailNotifications.newsletter}
                onValueChange={(value) => handleNotificationChange('newsletter', value)}
              />
            </div>

            <Divider />

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <MessageSquare className="text-gray-600" size={18} />
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-gray-600">
                    Receive text messages for important updates
                  </p>
                </div>
              </div>
              <Switch
                isSelected={preferences.smsNotifications}
                onValueChange={(value) => 
                  dispatch(updatePreferences({ smsNotifications: value }))
                }
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Shield className="text-gray-600" size={20} />
          <h2 className="text-xl font-semibold">Privacy & Security</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <Button variant="bordered" className="w-full justify-start">
            Manage Privacy Settings
          </Button>
          <Button variant="bordered" className="w-full justify-start">
            Download My Data
          </Button>
          <Button variant="bordered" className="w-full justify-start">
            Manage Cookie Preferences
          </Button>
        </CardBody>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <CreditCard className="text-gray-600" size={20} />
          <h2 className="text-xl font-semibold">Payment Methods</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <Button variant="bordered" className="w-full justify-start">
            Add Payment Method
          </Button>
          <Button variant="bordered" className="w-full justify-start">
            Manage Saved Cards
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}