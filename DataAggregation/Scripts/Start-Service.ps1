$cloud = $false
$singleNode = $true
$constrainedNodeTypes = $false

$lowkey = "-9223372036854775808"
$highkey = "9223372036854775807" 

$countyLowKey = 0
$countyHighKey = 57000

$appName = "fabric:/DataAggregation"
$appType = "DataAggregationType"
$appInitialVersion = "1.0.0"

if($singleNode)
{
    $webServiceInstanceCount = -1
    $deviceCreationInstanceCount = -1
    $countyServicePartitionCount = 1
    $deviceActorServicePartitionCount = 1
    $doctorServicePartitionCount = 1
}
else
{
    $webServiceInstanceCount = @{$true=-1;$false=1}[$cloud -eq $true] 
    $deviceCreationInstanceCount = @{$true=-1;$false=1}[$cloud -eq $true] 
    $countyServicePartitionCount = @{$true=10;$false=5}[$cloud -eq $true]  
    $deviceActorServicePartitionCount = @{$true=15;$false=5}[$cloud -eq $true]  
    $doctorServicePartitionCount = @{$true=100;$false=5}[$cloud -eq $true]  

    if($constrainedNodeTypes)
    {
        $webServiceConstraint = "NodeType == "
        $countyServiceConstraint = "NodeType == "
        $nationalServiceConstraint = "NodeType == "
        $deviceServiceConstraint = "NodeType == "
        $doctorServiceConstraint = "NodeType == "   
        $deviceCreationServiceConstraint = "NodeType == "        
    }
    else
    {
        $webServiceConstraint = ""
        $countyServiceConstraint = ""
        $nationalServiceConstraint = ""
        $deviceServiceConstraint = ""
        $doctorServiceConstraint = ""
        $deviceCreationServiceConstraint = ""   
    }
}

$webServiceType = "DataAggregation.WebServiceType"
$webServiceName = "DataAggregation.WebService"

$nationalServiceType = "DataAggregation.NationalServiceType"
$nationalServiceName = "DataAggregation.NationalService"
$nationalServiceReplicaCount = @{$true=1;$false=3}[$singleNode -eq $true]  

$countyServiceType = "DataAggregation.CountyServiceType"
$countyServiceName = "DataAggregation.CountyService"
$countyServiceReplicaCount = @{$true=1;$false=3}[$singleNode -eq $true]  

$deviceCreationServiceType = "DataAggregation.DeviceCreationServiceType"
$deviceCreationServiceName = "DataAggregation.DeviceCreationService"

$doctorServiceType = "DataAggregation.DoctorServiceType"
$doctorServiceName = "DataAggregation.DoctorService"
$doctorServiceReplicaCount = @{$true=1;$false=3}[$singleNode -eq $true]

$deviceActorServiceType = "DeviceActorServiceType"
$deviceActorServiceName= "DataAggregation.DeviceActorService"
$deviceActorReplicaCount = @{$true=1;$false=3}[$singleNode -eq $true]

New-ServiceFabricService -ServiceTypeName $webServiceType -Stateless -ApplicationName $appName -ServiceName "$appName/$webServiceName" -PartitionSchemeSingleton -InstanceCount $webServiceInstanceCount -PlacementConstraint $webServiceConstraint -ServicePackageActivationMode ExclusiveProcess

#create national
#New-ServiceFabricService -ServiceTypeName $nationalServiceType -Stateful -HasPersistedState -ApplicationName $appName -ServiceName "$appName/$nationalServiceName" -PartitionSchemeSingleton -MinReplicaSetSize $nationalServiceReplicaCount -TargetReplicaSetSize $nationalServiceReplicaCount -PlacementConstraint $nationalServiceConstraint -ServicePackageActivationMode ExclusiveProcess

#create county
#New-ServiceFabricService -ServiceTypeName $countyServiceType -Stateful -HasPersistedState -ApplicationName $appName -ServiceName "$appName/$countyServiceName" -PartitionSchemeUniformInt64 -LowKey $countyLowKey -HighKey $countyHighKey -PartitionCount $countyServicePartitionCount -MinReplicaSetSize $countyServiceReplicaCount -TargetReplicaSetSize $countyServiceReplicaCount -PlacementConstraint $countyServiceConstraint -ServicePackageActivationMode ExclusiveProcess

#create doctor
#New-ServiceFabricService -ServiceTypeName $doctorServiceType -Stateful -HasPersistedState -ApplicationName $appName -ServiceName "$appName/$doctorServiceName" -PartitionSchemeUniformInt64 -LowKey $lowkey -HighKey $highkey -PartitionCount $doctorServicePartitionCount -MinReplicaSetSize $doctorServiceReplicaCount -TargetReplicaSetSize $doctorServiceReplicaCount -PlacementConstraint $doctorServiceConstraint -ServicePackageActivationMode ExclusiveProcess

#create device
#New-ServiceFabricService -ServiceTypeName $deviceActorServiceType -Stateful -ApplicationName $appName -ServiceName "$appName/$deviceActorServiceName" -PartitionSchemeUniformInt64 -LowKey $lowkey -HighKey $highkey -PartitionCount $deviceActorServicePartitionCount -MinReplicaSetSize $deviceActorReplicaCount -TargetReplicaSetSize $deviceActorReplicaCount -PlacementConstraint $deviceServiceConstraint -ServicePackageActivationMode ExclusiveProcess

#create device creation
New-ServiceFabricService -ServiceTypeName $deviceCreationServiceType -Stateless -ApplicationName $appName -ServiceName "$appName/$deviceCreationServiceName" -PartitionSchemeSingleton -InstanceCount $deviceCreationInstanceCount -PlacementConstraint $deviceCreationServiceConstraint -ServicePackageActivationMode ExclusiveProcess