
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const Settings = () => {
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">System Settings</h2>
        <Button className="bg-medical-blue hover:bg-medical-blue/90">Save Changes</Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="priorities">Priority Management</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic system settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="system-name">System Name</Label>
                <Input id="system-name" defaultValue="PriorityCare Healthcare System" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time-zone">Default Time Zone</Label>
                <Select defaultValue="est">
                  <SelectTrigger>
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                    <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                    <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                    <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-format">Date Format</Label>
                <Select defaultValue="mdy">
                  <SelectTrigger>
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="debug-mode">Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable detailed logging for troubleshooting
                  </p>
                </div>
                <Switch id="debug-mode" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when notifications are sent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send notifications via email
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send notifications via SMS
                  </p>
                </div>
                <Switch id="sms-notifications" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reminder-time">Appointment Reminder Time</Label>
                <Select defaultValue="24">
                  <SelectTrigger>
                    <SelectValue placeholder="Select reminder time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour before</SelectItem>
                    <SelectItem value="6">6 hours before</SelectItem>
                    <SelectItem value="12">12 hours before</SelectItem>
                    <SelectItem value="24">24 hours before</SelectItem>
                    <SelectItem value="48">48 hours before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="admin-alerts">Administrative Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify administrators of high-priority appointments
                  </p>
                </div>
                <Switch id="admin-alerts" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="priorities">
          <Card>
            <CardHeader>
              <CardTitle>Priority Management</CardTitle>
              <CardDescription>
                Configure priority levels and scheduling rules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Priority Levels</Label>
                
                <div className="space-y-2 rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">High Priority</h4>
                      <p className="text-sm text-muted-foreground">
                        Emergency cases, VIP patients
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="high-scheduling" className="text-sm">Scheduling Window:</Label>
                      <Select defaultValue="0">
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="Days" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Same day</SelectItem>
                          <SelectItem value="1">1 day</SelectItem>
                          <SelectItem value="2">2 days</SelectItem>
                          <SelectItem value="3">3 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Medium Priority</h4>
                      <p className="text-sm text-muted-foreground">
                        Urgent but non-emergency cases
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="medium-scheduling" className="text-sm">Scheduling Window:</Label>
                      <Select defaultValue="3">
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="Days" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 days</SelectItem>
                          <SelectItem value="3">3 days</SelectItem>
                          <SelectItem value="5">5 days</SelectItem>
                          <SelectItem value="7">7 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Low Priority</h4>
                      <p className="text-sm text-muted-foreground">
                        Routine check-ups, follow-up visits
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="low-scheduling" className="text-sm">Scheduling Window:</Label>
                      <Select defaultValue="7">
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="Days" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 days</SelectItem>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="14">14 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="priority-override">Allow Priority Override</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow administrators to manually override priority levels
                  </p>
                </div>
                <Switch id="priority-override" defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="auto-priority">Automatic Priority Assignment</Label>
                <Select defaultValue="manual">
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual Assignment Only</SelectItem>
                    <SelectItem value="patient">Based on Patient Status</SelectItem>
                    <SelectItem value="condition">Based on Medical Condition</SelectItem>
                    <SelectItem value="hybrid">Hybrid (Patient + Condition)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Settings;
