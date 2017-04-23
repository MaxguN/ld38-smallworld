// Fill out your copyright notice in the Description page of Project Settings.

#include "SmallRTS.h"
#include "ProceduralMeshComponent.h"
#include "Territory.h"


// Sets default values
ATerritory::ATerritory()
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;


	mesh = CreateDefaultSubobject<UProceduralMeshComponent>(TEXT("GeneratedMesh"));
	RootComponent = mesh;
}

// Called when the game starts or when spawned
void ATerritory::BeginPlay()
{
	Super::BeginPlay();

	mesh->CreateMeshSection(1, vertices, triangles, TArray<FVector>(), TArray<FVector2D>(), TArray<FColor>(), TArray<FProcMeshTangent>(), false);
	mesh->SetMaterial(1, material);
}

// Called every frame
void ATerritory::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

}

