'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { Button } from '@/components/ui/Button'
import { 
  User, 
  Bell, 
  Shield, 
  Settings as SettingsIcon, 
  Bot, 
  Building, 
  Eye, 
  Key,
  Palette,
  Download,
  Trash2,
  Save,
  Camera,
  Upload
} from 'lucide-react'

export default function SettingsPage() {
  const { profile } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  
  // State for various settings
  const [theme, setTheme] = useState('light')
  const [fontSize, setFontSize] = useState('medium')
  const [language, setLanguage] = useState('english')
  const [compactMode, setCompactMode] = useState(false)
  const [organizationSettings, setOrganizationSettings] = useState({
    companyName: 'Big Marble Farms',
    department: 'Operations',
    teamSize: '50-200',
    industry: 'Agriculture',
    allowDataSharing: true,
    enableTeamFeatures: true
  })
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'team',
    activityTracking: true,
    analyticsOptIn: true,
    marketingEmails: false,
    dataRetention: '2-years',
    cookiePreferences: 'essential'
  })

  const settingsTabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'ai-assistant', name: 'AI Assistant', icon: Bot },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'organization', name: 'Organization', icon: Building },
    { id: 'privacy', name: 'Privacy', icon: Eye },
    { id: 'appearance', name: 'Appearance', icon: Palette }
  ]

  const renderProfileSettings = () => (
    <div id="profile" className="space-y-6">
      <div className="bg-marble-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-marble-900 mb-4">Profile Picture</h3>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-greenhouse-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
              {profile?.full_name?.charAt(0) || 'U'}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border-2 border-marble-200 rounded-full flex items-center justify-center hover:bg-marble-50 transition-colors">
              <Camera className="h-4 w-4 text-marble-600" />
            </button>
          </div>
          <div className="flex-1">
            <p className="text-sm text-marble-600 mb-3">
              Upload a new profile picture. Recommended size: 400x400px. Max file size: 5MB.
            </p>
            <div className="flex space-x-3">
              <input
                type="file"
                id="profile-picture"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  console.log('File selected:', e.target.files?.[0])
                }}
              />
              <label
                htmlFor="profile-picture"
                className="inline-flex items-center px-4 py-2 bg-greenhouse-600 text-white rounded-lg hover:bg-greenhouse-700 transition-colors cursor-pointer"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload New
              </label>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-marble-900 mb-4">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-marble-700 mb-2">Full Name</label>
          <input
            type="text"
            defaultValue={profile?.full_name || ''}
            className="w-full px-4 py-3 border border-marble-300 rounded-lg focus:ring-2 focus:ring-greenhouse-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-marble-700 mb-2">Email</label>
          <input
            type="email"
            defaultValue={profile?.email || 'Demo@bigmarble.ca'}
            className="w-full px-4 py-3 border border-marble-300 rounded-lg focus:ring-2 focus:ring-greenhouse-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-marble-700 mb-2">Company Position</label>
          <input
            type="text"
            defaultValue={profile?.company_position || ''}
            className="w-full px-4 py-3 border border-marble-300 rounded-lg focus:ring-2 focus:ring-greenhouse-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-marble-700 mb-2">Phone</label>
          <input
            type="tel"
            placeholder="(555) 123-4567"
            className="w-full px-4 py-3 border border-marble-300 rounded-lg focus:ring-2 focus:ring-greenhouse-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-marble-700 mb-2">Timezone</label>
          <select className="w-full px-4 py-3 border border-marble-300 rounded-lg focus:ring-2 focus:ring-greenhouse-500" defaultValue="America/Denver">
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div id="notifications" className="space-y-6">
      <h3 className="text-lg font-semibold text-marble-900 mb-4">Notification Preferences</h3>
      <div className="space-y-4">
        {[
          { name: 'Email', description: 'Receive notifications via email' },
          { name: 'Push', description: 'Browser push notifications' },
          { name: 'SMS', description: 'Text message notifications' },
          { name: 'Weekend', description: 'Receive notifications on weekends' }
        ].map((type) => (
          <div key={type.name} className="flex items-center justify-between p-4 bg-marble-50 rounded-lg">
            <div>
              <h4 className="font-medium text-marble-900">{type.name} Notifications</h4>
              <p className="text-sm text-marble-600">{type.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-greenhouse-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-greenhouse-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  )

  const renderAISettings = () => (
    <div id="ai-assistant" className="space-y-6">
      <h3 className="text-lg font-semibold text-marble-900 mb-4">AI Assistant Preferences</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-marble-700 mb-2">Response Length</label>
          <select className="w-full px-4 py-3 border border-marble-300 rounded-lg focus:ring-2 focus:ring-greenhouse-500">
            <option value="brief">Brief</option>
            <option value="medium" selected>Medium</option>
            <option value="detailed">Detailed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-marble-700 mb-2">AI Personality</label>
          <select className="w-full px-4 py-3 border border-marble-300 rounded-lg focus:ring-2 focus:ring-greenhouse-500">
            <option value="professional" selected>Professional</option>
            <option value="friendly">Friendly</option>
            <option value="casual">Casual</option>
            <option value="technical">Technical</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-marble-700 mb-2">Language</label>
          <select className="w-full px-4 py-3 border border-marble-300 rounded-lg focus:ring-2 focus:ring-greenhouse-500">
            <option value="english" selected>English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="german">German</option>
          </select>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="suggestions"
            defaultChecked
            className="w-4 h-4 text-greenhouse-600 border-gray-300 rounded focus:ring-greenhouse-500"
          />
          <label htmlFor="suggestions" className="text-sm font-medium text-marble-700">
            Enable AI suggestions
          </label>
        </div>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div id="security" className="space-y-6">
      <h3 className="text-lg font-semibold text-marble-900 mb-4">Security Settings</h3>
      <div className="space-y-4">
        <div className="bg-marble-50 p-4 rounded-lg">
          <h4 className="font-medium text-marble-900 mb-2">Password</h4>
          <p className="text-sm text-marble-600 mb-4">Last changed 30 days ago</p>
          <Button variant="outline" size="sm">Change Password</Button>
        </div>
        
        <div className="bg-marble-50 p-4 rounded-lg">
          <h4 className="font-medium text-marble-900 mb-2">Two-Factor Authentication</h4>
          <p className="text-sm text-marble-600 mb-4">Add an extra layer of security to your account</p>
          <Button variant="outline" size="sm">Enable 2FA</Button>
        </div>

        <div className="bg-marble-50 p-4 rounded-lg">
          <h4 className="font-medium text-marble-900 mb-2">Active Sessions</h4>
          <p className="text-sm text-marble-600 mb-4">Manage your active login sessions</p>
          <Button variant="outline" size="sm">View Sessions</Button>
        </div>
      </div>
    </div>
  )

  const renderOrganizationSettings = () => (
    <div id="organization" className="space-y-6">
      <h3 className="text-lg font-semibold text-marble-900 mb-4">Organization Settings</h3>
      
      {/* Team Collaboration */}
      <div className="bg-marble-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-marble-900 mb-4">Team Collaboration</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-marble-900">Enable Team Features</h5>
              <p className="text-sm text-marble-600">Allow team members to share resources and collaborate on projects</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={organizationSettings.enableTeamFeatures}
                onChange={(e) => setOrganizationSettings(prev => ({ ...prev, enableTeamFeatures: e.target.checked }))}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-greenhouse-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-greenhouse-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-marble-900">Data Sharing</h5>
              <p className="text-sm text-marble-600">Allow anonymous usage data to help improve the platform</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={organizationSettings.allowDataSharing}
                onChange={(e) => setOrganizationSettings(prev => ({ ...prev, allowDataSharing: e.target.checked }))}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-greenhouse-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-greenhouse-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Workshop Access */}
      <div className="bg-marble-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-marble-900 mb-4">Workshop Access</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-marble-200">
            <div>
              <h5 className="font-medium text-marble-900">Current Access</h5>
              <p className="text-sm text-marble-600">AI Leadership Accelerator Workshop - Complimentary Access</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-greenhouse-600">Active</p>
              <p className="text-xs text-marble-500">Included with Workshop</p>
            </div>
          </div>
          
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              🎓 This portal access is included complimentary with your AI Leadership Accelerator Workshop attendance.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPrivacySettings = () => (
    <div id="privacy" className="space-y-6">
      <h3 className="text-lg font-semibold text-marble-900 mb-4">Privacy Settings</h3>
      
      {/* Profile Privacy */}
      <div className="bg-marble-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-marble-900 mb-4">Profile Privacy</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-marble-700 mb-2">Profile Visibility</label>
            <select
              value={privacySettings.profileVisibility}
              onChange={(e) => setPrivacySettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
              className="w-full px-4 py-3 border border-marble-300 rounded-lg focus:ring-2 focus:ring-greenhouse-500"
            >
              <option value="public">Public - Visible to everyone</option>
              <option value="team">Team Only - Visible to team members</option>
              <option value="organization">Organization - Visible to organization members</option>
              <option value="private">Private - Only visible to you</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data & Analytics */}
      <div className="bg-marble-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-marble-900 mb-4">Data & Analytics</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-marble-900">Activity Tracking</h5>
              <p className="text-sm text-marble-600">Track your learning progress and module completion</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={privacySettings.activityTracking}
                onChange={(e) => setPrivacySettings(prev => ({ ...prev, activityTracking: e.target.checked }))}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-greenhouse-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-greenhouse-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-marble-900">Analytics Opt-in</h5>
              <p className="text-sm text-marble-600">Help improve the platform by sharing anonymous usage data</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={privacySettings.analyticsOptIn}
                onChange={(e) => setPrivacySettings(prev => ({ ...prev, analyticsOptIn: e.target.checked }))}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-greenhouse-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-greenhouse-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Communication Preferences */}
      <div className="bg-marble-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-marble-900 mb-4">Communication Preferences</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-marble-900">Marketing Emails</h5>
              <p className="text-sm text-marble-600">Receive updates about new features and workshops</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={privacySettings.marketingEmails}
                onChange={(e) => setPrivacySettings(prev => ({ ...prev, marketingEmails: e.target.checked }))}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-greenhouse-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-greenhouse-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-marble-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-marble-900 mb-4">Data Management</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-marble-700 mb-2">Data Retention Period</label>
            <select
              value={privacySettings.dataRetention}
              onChange={(e) => setPrivacySettings(prev => ({ ...prev, dataRetention: e.target.value }))}
              className="w-full px-4 py-3 border border-marble-300 rounded-lg focus:ring-2 focus:ring-greenhouse-500"
            >
              <option value="6-months">6 months</option>
              <option value="1-year">1 year</option>
              <option value="2-years">2 years</option>
              <option value="5-years">5 years</option>
              <option value="indefinite">Indefinite</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-marble-700 mb-2">Cookie Preferences</label>
            <select
              value={privacySettings.cookiePreferences}
              onChange={(e) => setPrivacySettings(prev => ({ ...prev, cookiePreferences: e.target.value }))}
              className="w-full px-4 py-3 border border-marble-300 rounded-lg focus:ring-2 focus:ring-greenhouse-500"
            >
              <option value="essential">Essential Only</option>
              <option value="functional">Essential + Functional</option>
              <option value="analytics">Essential + Functional + Analytics</option>
              <option value="all">All Cookies</option>
            </select>
          </div>
          
          <div className="pt-4 space-y-3">
            <Button variant="outline" size="sm" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download My Data
            </Button>
            <Button variant="outline" size="sm" className="w-full text-red-600 border-red-300 hover:bg-red-50">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete My Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAppearanceSettings = () => (
    <div id="appearance" className="space-y-6">
      <h3 className="text-lg font-semibold text-marble-900 mb-4">Appearance Settings</h3>
      
      {/* Theme Selection */}
      <div className="bg-marble-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-marble-900 mb-4">Theme</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'light', name: 'Light', description: 'Clean and bright interface' },
            { id: 'dark', name: 'Dark', description: 'Easy on the eyes in low light' },
            { id: 'auto', name: 'Auto', description: 'Matches your system preference' }
          ].map((themeOption) => (
            <div
              key={themeOption.id}
              onClick={() => setTheme(themeOption.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                theme === themeOption.id
                  ? 'border-greenhouse-500 bg-greenhouse-50'
                  : 'border-marble-200 bg-white hover:border-marble-300'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  theme === themeOption.id ? 'border-greenhouse-500 bg-greenhouse-500' : 'border-marble-300'
                }`}>
                  {theme === themeOption.id && <div className="w-full h-full rounded-full bg-white scale-50"></div>}
                </div>
                <h5 className="font-medium text-marble-900">{themeOption.name}</h5>
              </div>
              <p className="text-sm text-marble-600">{themeOption.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="bg-marble-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-marble-900 mb-4">Typography</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-marble-700 mb-2">Font Size</label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="w-full px-4 py-3 border border-marble-300 rounded-lg focus:ring-2 focus:ring-greenhouse-500"
            >
              <option value="small">Small</option>
              <option value="medium">Medium (Default)</option>
              <option value="large">Large</option>
              <option value="extra-large">Extra Large</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-marble-700 mb-2">Display Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 border border-marble-300 rounded-lg focus:ring-2 focus:ring-greenhouse-500"
            >
              <option value="english">English</option>
              <option value="spanish">Español</option>
              <option value="french">Français</option>
              <option value="german">Deutsch</option>
              <option value="portuguese">Português</option>
            </select>
          </div>
        </div>
      </div>

      {/* Layout Preferences */}
      <div className="bg-marble-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-marble-900 mb-4">Layout Preferences</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-marble-900">Compact Mode</h5>
              <p className="text-sm text-marble-600">Reduce spacing and padding for a more dense interface</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={compactMode}
                onChange={(e) => setCompactMode(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-greenhouse-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-greenhouse-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-marble-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-marble-900 mb-4">Preview</h4>
        <div className="bg-white rounded-lg border border-marble-200 p-4">
          <div className={`space-y-3 ${fontSize === 'small' ? 'text-sm' : fontSize === 'large' ? 'text-lg' : fontSize === 'extra-large' ? 'text-xl' : 'text-base'} ${compactMode ? 'space-y-1' : 'space-y-3'}`}>
            <h5 className="font-semibold text-marble-900">Sample Module Card</h5>
            <p className="text-marble-600">This is how your content will appear with the current settings.</p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-greenhouse-600 text-white rounded text-sm">Primary Button</button>
              <button className="px-3 py-1 border border-marble-300 text-marble-700 rounded text-sm">Secondary Button</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile': return renderProfileSettings()
      case 'notifications': return renderNotificationSettings()
      case 'ai-assistant': return renderAISettings()
      case 'security': return renderSecuritySettings()
      case 'organization': return renderOrganizationSettings()
      case 'privacy': return renderPrivacySettings()
      case 'appearance': return renderAppearanceSettings()
      default: 
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-marble-900 mb-2">Coming Soon</h3>
            <p className="text-marble-600">This section is under development.</p>
          </div>
        )
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-greenhouse-600 to-marble-600 rounded-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-lg opacity-90">Manage your account preferences and configuration 🌿</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-marble-200 p-4">
              <nav className="space-y-2">
                {settingsTabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-greenhouse-100 text-greenhouse-800'
                          : 'text-marble-700 hover:bg-marble-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.name}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-marble-200 p-6">
              {renderTabContent()}
              
              {['profile', 'notifications', 'ai-assistant', 'organization', 'privacy', 'appearance'].includes(activeTab) && (
                <div className="mt-8 pt-6 border-t border-marble-200">
                  <div className="flex justify-end space-x-4">
                    <Button 
                      variant="outline"
                      onClick={() => {
                        // Reset to initial values - demo functionality
                        if (activeTab === 'appearance') {
                          setTheme('light')
                          setFontSize('medium')
                          setLanguage('english')
                          setCompactMode(false)
                        }
                        console.log('Settings reset for:', activeTab)
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        // Save settings - demo functionality
                        const settingsData = {
                          theme,
                          fontSize,
                          language,
                          compactMode,
                          organizationSettings,
                          privacySettings
                        }
                        console.log('Saving settings:', settingsData)
                        // In real app, this would make an API call
                        alert(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} settings saved successfully!`)
                      }}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 